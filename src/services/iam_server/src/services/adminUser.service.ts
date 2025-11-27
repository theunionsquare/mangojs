import { inject, injectable, LazyServiceIdentifier } from "inversify";
import {
  INVERSITY_TYPES,
  IPersistenceContext,
  Types,
} from "@giusmento/mangojs-core";
import { Repository, EntityManager } from "typeorm";
import { errors, utils } from "@giusmento/mangojs-core";
import { api } from "../types";

import * as models from "../db/models";
import type { types as iamTypes } from "../../";

@injectable()
export class AdminUserService {
  // Inject Persistance Context
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: IPersistenceContext;

  private adminUserRepository: Repository<models.AdminUser>;
  private groupRepository: Repository<models.Group>;

  constructor() {
    // Initialize repositories when AppDataSource is ready
  }

  /**
   * Login - Authenticate an admin user with email and password
   *
   * @param email - The admin user's email address
   * @param password - The admin user's password
   * @returns Promise resolving to the authenticated admin user object
   * @throws {APIError} 401 UNAUTHORIZED if credentials are invalid
   */
  public async AdminUserLogIn(
    email: string,
    password: string
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by email
        const response = await em.findOneBy(models.AdminUser, {
          email,
          password,
        });
        //const response = await this.adminUserRepository.findOne({
        //    where: { email: email }
        //})
        if (!response) {
          throw new errors.APIError(401, "UNAUTHORIZED", "Unauthorized");
        }
        return response;
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }

  /**
   * Get Admin User - Retrieve a single admin user by their unique identifier
   *
   * @param uid - The unique identifier (uid) of the admin user
   * @returns Promise resolving to the admin user object with their details
   * @throws {APIError} 404 NOT_FOUND if the admin user does not exist
   */
  public async getAdminUser(
    uid: string
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid
        const adminUser = await em.findOneBy(models.AdminUser, {
          uid,
          // relations: ['groups'] // Uncomment if you need groups
        });

        if (!adminUser) {
          throw new errors.APIError(404, "NOT_FOUND", "Admin user not found");
        }

        return {
          uid: adminUser.uid,
          username: adminUser.username,
          email: adminUser.email,
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          status: adminUser.status,
          isActive: adminUser.isActive,
          isVerified: adminUser.isVerified,
          createdAt: adminUser.createdAt,
          updatedAt: adminUser.updatedAt,
          verifiedAt: adminUser.verifiedAt,
          //groups: adminUser.groups?.map((gr) => {
          //  return {
          //    uid: gr.uid,
          //    name: gr.name,
          //    description: gr.description,
          //    permissions: gr.permissions,
          //  };
          //}),
        };
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }

  /**
   * Get Admin User By Username - Retrieve an admin user by their username
   *
   * @param username - The username of the admin user
   * @returns Promise resolving to the admin user object
   */
  public async getAdminUserByUsername(
    username: string
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by username
        const response = await em.findOneBy(models.AdminUser, {
          username: username,
        });
        return response;
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }

  /**
   * Get Admin User By Magic Link - Retrieve an admin user by their magic link token
   *
   * @param magicLink - The magic link token
   * @returns Promise resolving to the admin user object associated with the magic link
   * @description Used during account activation or password reset flows
   */
  public async getAdminUserByMagicLink(
    magicLink: string
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by magic link
        const response = await em.findOneBy(models.AdminUser, {
          magicLink,
        });
        return response;
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }

  /**
   * Activate Admin User - Activate an admin user account using their magic link
   *
   * @param magicLink - The magic link token
   * @param payload - Object containing additional admin user information to update during activation
   * @returns Promise resolving to the activation result
   * @description Sets admin user status to ACTIVE, marks as verified, clears magic link, and updates verification timestamp
   */
  public async activateAdminUser(
    magicLink: string,
    payload: Partial<api.v1.adminUser.activate.POST.RequestBody>
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // update by magic link
        const updateResult = await em.update(
          models.AdminUser,
          { magicLink },
          {
            ...payload,
            isActive: true,
            isVerified: true,
            status: Types.enums.AdminUserStatus.ACTIVE,
            verifiedAt: new Date(),
            magicLink: null,
            magicLinkExpireDate: null,
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }

  /**
   * Post Admin User - Create a new admin user with auto-generated credentials and magic link
   *
   * @param adminUser - The admin user data including firstName, lastName, email, and groups
   * @returns Promise resolving to the created admin user object
   * @throws {APIError} 409 CONFLICT if email already exists
   * @throws {APIError} 404 NOT_FOUND if the specified group does not exist
   * @description Generates a random password and magic link for account activation. The magic link expires in 24 hours.
   */
  public async postAdminUser(
    adminUser: iamTypes.entities.adminUser.AdminUserPost
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // search if email is unique
        console.log({ adminUser }, "search email");
        const isUnique = await em.findOne(models.AdminUser, {
          where: { email: adminUser.email },
        });

        if (isUnique) {
          throw new errors.APIError(409, "CONFLICT", "Email already exists");
        }

        // get group by uid
        console.log({ adminUser }, "search group UID");
        const respGroup = await em.findOne(models.Group, {
          where: {
            userType: Types.enums.AuthUserType.ADMIN,
            default: true,
          },
        });

        if (!respGroup) {
          throw new errors.APIError(404, "NOT_FOUND", "Group not found");
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

        // create admin user
        const newAdminUser = em.create(models.AdminUser, {
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          email: adminUser.email,
          password: password,
          groups: [respGroup],
          isActive: true,
          isVerified: false,
          status: Types.enums.AdminUserStatus.PENDING,
          magicLink,
          magicLinkExpireDate,
        });

        const response = await em.save(models.AdminUser, newAdminUser);
        return response;
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }

  /**
   * Get Admin Users - Retrieve all admin users in the system
   *
   * @returns Promise resolving to an array of all admin user objects with complete details including groups, status, and timestamps
   */
  public async getAdminUsers(): Promise<
    Array<iamTypes.entities.adminUser.AdminUser>
  > {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<iamTypes.entities.adminUser.AdminUser> = [];

        const users = await em.find(models.AdminUser, {
          relations: ["groups"],
        });

        for (const adminUser of users) {
          responseArray.push({
            uid: adminUser.uid,
            username: adminUser.username as any,
            email: adminUser.email,
            age: adminUser.age,
            phoneNumber: adminUser.phoneNumber,
            firstName: adminUser.firstName,
            lastName: adminUser.lastName,
            status: adminUser.status,
            isActive: adminUser.isActive,
            isVerified: adminUser.isVerified,
            magicLink: adminUser.magicLink,
            magicLinkExpireDate: adminUser.magicLinkExpireDate,
            disabledAt: adminUser.disabledAt,
            createdAt: adminUser.createdAt,
            updatedAt: adminUser.updatedAt,
            verifiedAt: adminUser.verifiedAt,
            resetPasswordAtLogin: false,
            groups: adminUser.groups,
          });
        }
        return responseArray;
      }
    )) as Array<iamTypes.entities.adminUser.AdminUser>;
    return response;
  }

  /**
   * Update Admin User - Update admin user profile information
   *
   * @param uid - The admin user's uid
   * @param document - Object containing the fields to update (firstName, lastName, phoneNumber)
   * @returns Promise resolving to the update result
   */
  public async updateAdminUser(
    uid: string,
    document: Partial<iamTypes.entities.adminUser.AdminUserPost>
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // putAdminUser
        const putAdminUser = {
          firstName: document.firstName,
          lastName: document.lastName,
        };
        const updateResult = await em.update(
          models.AdminUser,
          { uid },
          putAdminUser
        );
        return updateResult;
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }

  /**
   * Update Groups - Update the group memberships for an admin user
   *
   * @param uid - The admin user's uid
   * @param document - Object containing the new groups to assign to the admin user
   * @returns Promise resolving to the updated admin user object
   * @throws {APIError} 404 NOT_FOUND if the admin user does not exist
   * @description Replaces the admin user's existing groups with the new set of groups
   */
  public async updateGroupsToAdminUser(
    uid: string,
    document: Partial<api.v1.adminUser.groups.POST.RequestBody>
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // TODO: fix group with the new type
        // get group entities
        const groups = await em.find(models.Group, {
          where: {
            userType: Types.enums.AuthUserType.ADMIN,
            //uid: document.groups.map((gr: any) => gr.value) as any,
          },
        });

        // find admin user
        const adminUser = await em.findOneBy(models.AdminUser, {
          uid,
        });

        if (!adminUser) {
          throw new errors.APIError(404, "NOT_FOUND", "Admin user not found");
        }

        // update groups
        adminUser.groups = groups;
        const updateResult = await em.save(adminUser);
        return updateResult;
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }

  /**
   * Disable Admin User - Disable an admin user account
   *
   * @param uid - The admin user's uid
   * @returns Promise resolving to the update result
   * @description Sets admin user status to DISABLED, marks as inactive, and records the disable timestamp
   */
  public async disableAdminUser(
    uid: string
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.AdminUser,
          { uid },
          {
            status: Types.enums.AdminUserStatus.DISABLED,
            isActive: false,
            disabledAt: new Date(),
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }

  /**
   * Enable Admin User - Enable an admin user account
   *
   * @param uid - The admin user's uid
   * @returns Promise resolving to the update result
   * @description Sets admin user status to ACTIVE, marks as active, and clears the disable timestamp
   */
  public async enableAdminUser(
    uid: string
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.AdminUser,
          { uid },
          {
            status: Types.enums.AdminUserStatus.ACTIVE,
            isActive: true,
            disabledAt: null,
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }

  /**
   * Hard Delete Admin User - Permanently delete an admin user account
   *
   * @param uid - The admin user's uid
   * @returns Promise resolving to the delete result
   * @description Performs a hard delete - the admin user record is permanently removed and cannot be recovered
   */
  public async hardDeleteAdminUser(
    uid: string
  ): Promise<iamTypes.entities.adminUser.AdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const deleteResult = await em.delete(models.AdminUser, {
          uid,
        });
        return deleteResult;
      }
    )) as iamTypes.entities.adminUser.AdminUser;
    return response;
  }
}
