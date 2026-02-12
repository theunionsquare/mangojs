import { inject, injectable } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext } from "@theunionsquare/mangojs-core";
import { EntityManager } from "typeorm";
import { errors, utils } from "@theunionsquare/mangojs-core";

import * as models from "../db/models";
import { Group } from "../db/models/Group.entity";

import { Types as coreTypes } from "@theunionsquare/mangojs-core";
import type { types as iamTypes } from "../../";
import { partner } from "../types/entities";
import { In } from "typeorm";
import { magiclinks } from "../types/api/v1/adminUser";

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
    uid: string
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid
        const partnerUser = await em.getRepository(models.PartnerUser).findOne({
          where: { uid },
          relations: ["groups", "partner"],
        });

        if (!partnerUser) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner user not found");
        }

        return {
          uid: partnerUser.uid,
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
          partner: partnerUser.partner,
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
    partnerUid: string,
    filter: iamTypes.entities.common.filter
  ): Promise<Array<iamTypes.entities.partnerUser.PartnerUser>> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const users = await em.find(models.PartnerUser, {
          where: { partner: { uid: partnerUid } },
          relations: ["groups"],
          ...filter,
        });

        const response = users.map((user) => ({
          uid: user.uid,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.status,
          isActive: user.isActive,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          verifiedAt: user.verifiedAt,
          groups: user.groups.map((group) => ({
            uid: group.uid,
            name: group.name,
          })),
        }));

        return response;
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
    partnerUid: string,
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
        // search partner
        const partner = await em.findOneBy(models.Partner, {
          uid: partnerUid,
        });
        if (!partner) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner not found");
        }

        // set magic link
        const magicLink = utils.generateMagicLink();
        // set password
        let resetPasswordAtLogin = false;
        if (!partnerData.password) {
          partnerData.password = utils.generateRandomPassword(12);
          resetPasswordAtLogin = true;
        } else {
        }
        const hashedPassword = utils.hashedPassword(partnerData.password);
        // set expiring date
        const magicLinkExpiretime = parseInt(
          process.env.MAGIC_LINK_EXPIRE_TIME || "86400000"
        );
        const magicLinkExpireDate = new Date(
          new Date().getTime() + magicLinkExpiretime
        );

        // create partner user
        const newPartnerUser = em.create(models.PartnerUser, {
          firstName: partnerData.firstName,
          lastName: partnerData.lastName,
          email: partnerData.email,
          password: hashedPassword,
          isActive: true,
          isVerified: false,
          status: coreTypes.enums.PartnerUserStatus.PENDING,
          magicLink,
          magicLinkExpireDate,
          resetPasswordAtLogin,
          groups: partnerData.groups,
          partner: partner,
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
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const partnerUser = await em.findOne(models.PartnerUser, {
          where: { uid },
        });
        if (!partnerUser) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner user not found");
        }

        const response = Object.assign(partnerUser, {
          firstName: document.firstName,
          lastName: document.lastName,
          phoneNumber: document.phoneNumber,
        });

        await em.save(response);

        return response;
      }
    );
    return response as iamTypes.entities.partnerUser.PartnerUser;
  }

  /**
   * Update MagicLink - Update partner user magic link
   *
   * @param uid - The user's uid
   * @param document - Object containing the fields to update (firstName, lastName, phoneNumber)
   * @returns Promise resolving to the update result
   */
  public async updateMagicLink(
    uid: string
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const partnerUser = await em.findOne(models.PartnerUser, {
          where: { uid },
        });
        if (!partnerUser) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner user not found");
        }

        const response = Object.assign(partnerUser, {
          magicLink: utils.generateMagicLink(),
          magicLinkExpireDate: new Date(
            new Date().getTime() +
              parseInt(process.env.MAGIC_LINK_EXPIRE_TIME || "86400000")
          ),
        });

        await em.save(response);

        return response;
      }
    );
    return response as iamTypes.entities.partnerUser.PartnerUser;
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
   * Update Groups - Update the groups assigned to a partner user
   *
   * @param uid - The user's uid
   * @param document - Object containing groups to add, remove, or set
   * @returns Promise resolving to the updated user object
   * @throws {APIError} 404 NOT_FOUND if the user does not exist
   * @description Allows adding, removing, or setting groups for the user. Only one operation can be performed at a time.
   */
  public async updateGroups(
    uid: string,
    document: iamTypes.entities.group.GroupManageForUser
  ): Promise<iamTypes.entities.partnerUser.PartnerUser> {
    // validate input
    if (
      !document ||
      (document.add === undefined &&
        document.remove === undefined &&
        document.set === undefined)
    ) {
      throw new errors.APIError(
        400,
        "BAD_REQUEST",
        "No groups provided for update"
      );
    }
    // reject if more than one operation is provided
    const operations = [
      document.add ? 1 : 0,
      document.remove ? 1 : 0,
      document.set ? 1 : 0,
    ].reduce((a, b) => a + b, 0);
    if (operations !== 1) {
      throw new errors.APIError(
        400,
        "BAD_REQUEST",
        "Only one operation (add, remove, set) can be performed at a time"
      );
    }

    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get all groups entities in the request
        const allGroupUids: string[] = [];
        if (document.add) {
          allGroupUids.push(...document.add);
        }
        if (document.remove) {
          allGroupUids.push(...document.remove);
        }
        if (document.set) {
          allGroupUids.push(...document.set);
        }

        // fetch group entities
        const groups = await em
          .getRepository(Group)
          .createQueryBuilder("group")
          .where("group.userType = :userType AND group.uid IN (:...uids)", {
            userType: coreTypes.enums.AuthUserType.PARTNER,
            uids: allGroupUids,
          })
          .getMany();

        // reject if group is owner
        const ownerGroup = groups.find(
          (g) => g.name.toLocaleLowerCase() === "owner"
        );
        if (ownerGroup) {
          throw new errors.APIError(
            400,
            "BAD_REQUEST",
            "Cannot modify owner group"
          );
        }

        // find admin user
        const user = await em.findOne(models.PartnerUser, {
          where: { uid },
          relations: ["groups"],
        });

        if (!user) {
          throw new errors.APIError(404, "NOT_FOUND", "User not found");
        }

        // update groups based on operation
        if (document.add) {
          const groupsToAdd = groups.filter((g) =>
            document.add!.includes(g.uid)
          );
          user.groups = Array.from(
            new Set([...(user.groups || []), ...groupsToAdd])
          );
        } else if (document.remove) {
          const groupsToRemoveUids = new Set(document.remove);
          user.groups = (user.groups || []).filter(
            (g) => !groupsToRemoveUids.has(g.uid)
          );
        } else if (document.set) {
          const groupsToSet = groups.filter((g) =>
            document.set!.includes(g.uid)
          );
          user.groups = groupsToSet;
        }

        // save updated user
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
