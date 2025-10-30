import { inject, injectable } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext } from "@giusmento/mangojs-core";
import { EntityManager } from "typeorm";
import { errors, utils } from "@giusmento/mangojs-core";

import * as models from "../db/models";
import { Group } from "../db/models/Group.entity";

import { Types as coreTypes } from "@giusmento/mangojs-core";
import type { types as iamTypes } from "../../";

@injectable()
export class PartnerUserService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  constructor() {
    // Initialize repositories when AppDataSource is ready
  }

  /**
   * Login - Authenticate a partner user with email and password
   *
   * @param email - The partner user's email address
   * @param password - The partner user's password (will be hashed for comparison)
   * @returns Promise resolving to the authenticated partner user object
   * @throws {APIError} 401 UNAUTHORIZED if credentials are invalid
   */
  public async logIn(
    email: string,
    password: string
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // hash password
        const hashedPassword = utils.hashedPassword(password);
        // get by email
        const response = await em.findOneBy(models.PartnerUser, {
          email: email,
          password: hashedPassword,
        });
        if (!response) {
          throw new errors.APIError(401, "UNAUTHORIZED", "Unauthorized");
        }
        return response;
      }
    )) as iamTypes.entities.partnerUser.PartnerUser;
    return response;
  }

  /**
   * Get - Retrieve a single partner user by their unique identifier
   *
   * @param partnerUserId - The unique identifier (uid) of the partner user
   * @returns Promise resolving to the partner user object with their details
   * @throws {APIError} 404 NOT_FOUND if the partner user does not exist
   */
  public async get(
    partnerUserId: string
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid
        const partnerUser = await em.findOneBy(models.PartnerUser, {
          uid: partnerUserId,
        });

        if (!partnerUser) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner user not found");
        }

        return {
          uid: partnerUser.uid,
          username: partnerUser.username,
          email: partnerUser.email,
          firstName: partnerUser.firstName,
          lastName: partnerUser.lastName,
          status: partnerUser.status,
          isActive: partnerUser.isActive,
          isVerified: partnerUser.isVerified,
          createdAt: partnerUser.createdAt,
          updatedAt: partnerUser.updatedAt,
          verifiedAt: partnerUser.verifiedAt,
          groups: partnerUser.groups,
        };
      }
    )) as iamTypes.entities.partnerUser.PartnerUser;
    return response;
  }

  /**
   * Get All - Retrieve all partner users in the system
   *
   * @param filter - Filter criteria for querying partner users
   * @returns Promise resolving to an array of all partner user objects with complete details including groups, status, and timestamps
   */
  public async getAll(
    filter: iamTypes.entities.common.filter
  ): Promise<Array<iamTypes.entities.partnerUser.PartnerUser>> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<any> = [];

        const users = await em.find(models.PartnerUser, filter);

        for (const partnerUser of users) {
          responseArray.push({
            uid: partnerUser.uid,
            username: partnerUser.username,
            email: partnerUser.email,
            age: partnerUser.age,
            phoneNumber: partnerUser.phoneNumber,
            firstName: partnerUser.firstName,
            lastName: partnerUser.lastName,
            status: partnerUser.status,
            isActive: partnerUser.isActive,
            isVerified: partnerUser.isVerified,
            magicLink: partnerUser.magicLink,
            magicLinkExpireDate: partnerUser.magicLinkExpireDate,
            disabledAt: partnerUser.disabledAt,
            createdAt: partnerUser.createdAt,
            updatedAt: partnerUser.updatedAt,
            verifiedAt: partnerUser.verifiedAt,
            groups: partnerUser.groups,
          });
        }
        return responseArray;
      }
    )) as Array<iamTypes.entities.partnerUser.PartnerUser>;
    return response;
  }

  /**
   * Post - Create a new partner user with auto-generated credentials and magic link
   *
   * @param partnerData - The partner user data including firstName, lastName, email, and groups
   * @returns Promise resolving to the created partner user object
   * @throws {APIError} 409 CONFLICT if email already exists
   * @description Generates a random password and magic link for account activation. The magic link expires in 24 hours.
   */
  public async post(
    partnerData: iamTypes.entities.partnerUser.PartnerUserPost
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // search if email is unique
        const isUnique = await em.findOneBy(models.PartnerUser, {
          email: partnerData.email,
        });

        if (isUnique) {
          throw new errors.APIError(409, "CONFLICT", "Email already exists");
        }

        // set magic link
        const magicLink = utils.generateMagicLink();
        // set random password
        const password = utils.hashedPassword(partnerData.password);
        // set expiring date
        const expDate = new Date();
        const magicLinkExpireDate = new Date(
          expDate.getTime() + 24 * 60 * 60 * 1000
        ); // 1 day

        // create partner user
        const newPartnerUser = em.create(models.PartnerUser, {
          firstName: partnerData.firstName,
          lastName: partnerData.lastName,
          email: partnerData.email,
          password: password,
          groups: partnerData.groups,
          isActive: true,
          isVerified: false,
          status: coreTypes.enums.PartnerUserStatus.PENDING,
          magicLink,
          magicLinkExpireDate,
          partner: partnerData.partner,
        });

        const response = await em.save(newPartnerUser);

        return response;
      }
    )) as iamTypes.entities.partnerUser.PartnerUser;
    return response;
  }

  /**
   * Update - Update partner user profile information
   *
   * @param uid - The user's uid
   * @param document - Object containing the fields to update (firstName, lastName, phoneNumber)
   * @returns Promise resolving to the update result
   */
  public async update(
    uid: string,
    document: Partial<iamTypes.entities.partnerUser.PartnerUser>
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.PartnerUser,
          { uid },
          {
            firstName: document.firstName,
            lastName: document.lastName,
            phoneNumber: document.phoneNumber,
          }
        );
        return updateResult;
      }
    );
    return response;
  }

  /**
   * Get By Magic Link - Retrieve a partner user by their magic link token
   *
   * @param magicLink - The magic link token
   * @returns Promise resolving to the partner user object associated with the magic link
   * @description Used during account activation or password reset flows
   */
  public async getByMagicLink(
    magicLink: string
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by magic link
        const response = await em.findOneBy(models.PartnerUser, {
          magicLink,
        });
        return response;
      }
    )) as iamTypes.entities.partnerUser.PartnerUser;
    return response;
  }

  /**
   * Activate - Activate a partner user account using their magic link
   *
   * @param magicLink - The magic link token
   * @param payload - Object containing additional user information to update during activation
   * @returns Promise resolving to the activation result
   * @description Sets user status to ENABLED, marks as verified, clears magic link, and updates verification timestamp
   */
  public async activate(
    magicLink: string,
    payload: Partial<iamTypes.entities.partnerUser.PartnerUser>
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // update by magic link
        const updateResult = await em.update(
          models.PartnerUser,
          { magicLink },
          {
            ...payload,
            isActive: true,
            isVerified: true,
            status: coreTypes.enums.PartnerUserStatus.ACTIVE,
            verifiedAt: new Date(),
            magicLink: null,
            magicLinkExpireDate: null,
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.partnerUser.PartnerUser;
    return response;
  }
  /**
   * Update Groups - Update the group memberships for a partner user
   *
   * @param uid - The user's uid
   * @param document - Object containing the new groups to assign to the user
   * @returns Promise resolving to the updated user object
   * @throws {APIError} 404 NOT_FOUND if the user does not exist
   * @description Replaces the user's existing groups with the new set of groups
   */
  public async updateGroups(
    uid: string,
    document: Partial<iamTypes.entities.partnerUser.PartnerUser>
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get group entities
        const groups = await em.find(Group, {
          where: {
            userType: coreTypes.enums.AuthUserType.PARTNER,
            uid: document.groups.map((gr: any) => gr.value) as any,
          },
        });

        // find admin user
        const user = await em.findOneBy(models.PartnerUser, {
          uid,
        });

        if (!user) {
          throw new errors.APIError(404, "NOT_FOUND", "User not found");
        }

        // update groups
        user.groups = groups;
        const updateResult = await em.save(user);
        return updateResult;
      }
    )) as iamTypes.entities.partnerUser.PartnerUser;
    return response;
  }

  /**
   * Disable - Disable a partner user account
   *
   * @param uid - The user's uid
   * @returns Promise resolving to the update result
   * @description Sets user status to DISABLED, marks as inactive, and records the disable timestamp
   */
  public async disable(
    uid: string
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.PartnerUser,
          { uid },
          {
            status: coreTypes.enums.PartnerUserStatus.DISABLED,
            isActive: false,
            disabledAt: new Date(),
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.partnerUser.PartnerUser;
    return response;
  }

  /**
   * Enable - Enable a partner user account
   *
   * @param uid - The user's uid
   * @returns Promise resolving to the update result
   * @description Sets user status to ENABLED, marks as active, and clears the disable timestamp
   */
  public async enable(
    uid: string
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.PartnerUser,
          { uid },
          {
            status: coreTypes.enums.PartnerUserStatus.ACTIVE,
            isActive: true,
            disabledAt: null,
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.partnerUser.PartnerUser;
    return response;
  }

  /**
   * Hard Delete - Permanently delete a partner user account
   *
   * @param uid - The user's uid
   * @returns Promise resolving to the delete result
   * @description Performs a hard delete - the user record is permanently removed and cannot be recovered
   */
  public async hardDelete(
    uid: string
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const deleteResult = await em.delete(models.PartnerUser, {
          uid,
        });
        return deleteResult;
      }
    )) as iamTypes.entities.partnerUser.PartnerUser;
    return response;
  }
}
