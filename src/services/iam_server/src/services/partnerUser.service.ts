import { inject, injectable } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext } from "@giusmento/mangojs-core";
import { Repository, EntityManager } from "typeorm";
import { errors, utils } from "@giusmento/mangojs-core";
import { api } from "../types";

import * as models from "../db/models";
import { Group, IGroup } from "../db/models/Group.entity";

import { Types as coreTypes } from "@giusmento/mangojs-core";
import type { types as iamTypes } from "../../";

@injectable()
export class PartnerUserService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  private partnerUserRepository: Repository<models.PartnerUser>;

  constructor() {
    // Initialize repositories when AppDataSource is ready
  }

  /**
   * Authenticate a partner user with email and password
   *
   * @param email - The partner user's email address
   * @param password - The partner user's password (will be hashed for comparison)
   * @returns Promise resolving to the authenticated partner user object
   * @throws {APIError} 401 UNAUTHORIZED if credentials are invalid
   */
  public async logIn(
    email: string,
    password: string
  ): Promise<models.IPartnerUser> {
    const response = await this._persistenceContext.inTransaction(
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
    );
    return response as models.IPartnerUser;
  }

  /**
   * Retrieve a single partner user by their unique identifier
   *
   * @param partnerUserId - The unique identifier (uid) of the partner user
   * @returns Promise resolving to the partner user object with their details
   * @throws {APIError} 404 NOT_FOUND if the partner user does not exist
   */
  public async get(partnerUserId: string): Promise<models.IPartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid
        const partnerUser = await this.partnerUserRepository.findOne({
          where: { uid: partnerUserId },
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
    )) as models.IPartnerUser;
    return response;
  }

  /**
   * Retrieve all partner users in the system
   *
   * @returns Promise resolving to an array of all partner user objects with complete details including groups, status, and timestamps
   */
  public async getAll(): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<any> = [];

        const users = await this.partnerUserRepository.find();

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
    );
    return response;
  }

  /**
   * Create a new partner user with auto-generated credentials and magic link
   *
   * @param partnerUser - The partner user data including firstName, lastName, email, and groups
   * @returns Promise resolving to the created partner user object
   * @throws {APIError} 409 CONFLICT if email already exists
   * @description Generates a random password and magic link for account activation. The magic link expires in 24 hours.
   */
  public async post(
    partnerUser: api.v1.partners.users.POST.RequestBody
  ): Promise<api.v1.partners.users.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // search if email is unique
        const isUnique = await this.partnerUserRepository.findOne({
          where: { email: partnerUser.email },
        });

        if (isUnique) {
          throw new errors.APIError(409, "CONFLICT", "Email already exists");
        }

        // set magic link
        const magicLink = utils.generateMagicLink();
        // set random password
        const password = utils.generateRandomPassword();
        // set expiring date
        const expDate = new Date();
        const magicLinkExpireDate = new Date(
          expDate.getTime() + 24 * 60 * 60 * 1000
        ); // 1 day

        // fetch group entities
        const groups = await em.find(Group, {
          where: {
            userType: coreTypes.entities.AuthUserType.USER,
            uid: partnerUser.groups as any,
          },
        });

        // create partner user
        const newPartnerUser = this.partnerUserRepository.create({
          firstName: partnerUser.firstName,
          lastName: partnerUser.lastName,
          email: partnerUser.email,
          password: password,
          groups: groups,
          isActive: true,
          isVerified: false,
          status: "PENDING",
          magicLink,
          magicLinkExpireDate,
        });

        const response = await this.partnerUserRepository.save(newPartnerUser);
        return response;
      }
    )) as api.v1.partners.users.ResponseBodyData;
    return response;
  }

  /**
   * Update partner user profile information
   *
   * @param params - Object containing the user's uid
   * @param document - Object containing the fields to update (firstName, lastName, phoneNumber)
   * @returns Promise resolving to the update result
   */
  public async update(
    params: iamTypes.api.v1.users.PUT.Params,
    document: iamTypes.api.v1.users.PUT.RequestBody
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.PartnerUser,
          { uid: params.uid },
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
   * Retrieve a partner user by their magic link token
   *
   * @param params - Object containing the magic link token
   * @returns Promise resolving to the partner user object associated with the magic link
   * @description Used during account activation or password reset flows
   */
  public async getByMagicLink(
    params: iamTypes.api.v1.partners.users.magiclinks.GET.Params
  ): Promise<iamTypes.api.v1.partners.users.magiclinks.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by magic link
        const response = await em.findOneBy(models.PartnerUser, {
          magicLink: params.magiclink,
        });
        return response;
      }
    )) as iamTypes.api.v1.partners.users.magiclinks.ResponseBodyData;
    return response;
  }

  /**
   * Activate a partner user account using their magic link
   *
   * @param params - Object containing the magic link token
   * @param payload - Object containing additional user information to update during activation
   * @returns Promise resolving to the activation result
   * @description Sets user status to ENABLED, marks as verified, clears magic link, and updates verification timestamp
   */
  public async activate(
    params: iamTypes.api.v1.partners.users.activate.POST.Params,
    payload: iamTypes.api.v1.partners.users.activate.POST.RequestBody
  ): Promise<iamTypes.api.v1.partners.users.activate.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // update by magic link
        const updateResult = await em.update(
          models.PartnerUser,
          { magicLink: params.magiclink },
          {
            ...payload,
            isActive: true,
            isVerified: true,
            status: "ENABLED",
            verifiedAt: new Date(),
            magicLink: null,
            magicLinkExpireDate: null,
          }
        );
        return updateResult;
      }
    )) as iamTypes.api.v1.partners.users.activate.ResponseBodyData;
    return response;
  }
  /**
   * Update the group memberships for a partner user
   *
   * @param params - Object containing the user's uid
   * @param document - Object containing the new groups to assign to the user
   * @returns Promise resolving to the updated user object
   * @throws {APIError} 404 NOT_FOUND if the user does not exist
   * @description Replaces the user's existing groups with the new set of groups
   */
  public async updateGroups(
    params: iamTypes.api.v1.partners.users.groups.POST.Params,
    document: iamTypes.api.v1.partners.users.groups.POST.RequestBody
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get group entities
        const groups = await em.find(Group, {
          where: {
            userType: coreTypes.entities.AuthUserType.PARTNER,
            uid: document.groups.map((gr: any) => gr.value) as any,
          },
        });

        // find admin user
        const user = await em.findOneBy(models.PartnerUser, {
          uid: params.uid,
        });

        if (!user) {
          throw new errors.APIError(404, "NOT_FOUND", "User not found");
        }

        // update groups
        user.groups = groups;
        const updateResult = await em.save(user);
        return updateResult;
      }
    );
    return response;
  }

  /**
   * Disable a partner user account
   *
   * @param params - Object containing the user's uid
   * @returns Promise resolving to the update result
   * @description Sets user status to DISABLED, marks as inactive, and records the disable timestamp
   */
  public async disable(
    params: iamTypes.api.v1.partners.users.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.PartnerUser,
          { uid: params.uid },
          {
            status: "DISABLED",
            isActive: false,
            disabledAt: new Date(),
          }
        );
        return updateResult;
      }
    );
    return response;
  }

  /**
   * Enable a partner user account
   *
   * @param params - Object containing the user's uid
   * @returns Promise resolving to the update result
   * @description Sets user status to ENABLED, marks as active, and clears the disable timestamp
   */
  public async enable(
    params: iamTypes.api.v1.partners.users.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.PartnerUser,
          { uid: params.uid },
          {
            status: "ENABLED",
            isActive: true,
            disabledAt: null,
          }
        );
        return updateResult;
      }
    );
    return response;
  }

  /**
   * Permanently delete a partner user from the database
   *
   * @param params - Object containing the user's uid
   * @returns Promise resolving to the delete result
   * @description Performs a hard delete - the user record is permanently removed and cannot be recovered
   */
  public async hardDelete(
    params: iamTypes.api.v1.partners.users.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const deleteResult = await em.delete(models.PartnerUser, {
          uid: params.uid,
        });
        return deleteResult;
      }
    );
    return response;
  }
}
