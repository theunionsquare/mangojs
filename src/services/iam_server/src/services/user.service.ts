import { inject, injectable } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext } from "@theunionsquare/mangojs-core";
import { Repository, EntityManager } from "typeorm";
import { errors, utils } from "@theunionsquare/mangojs-core";
import { Types as coreTypes } from "@theunionsquare/mangojs-core";
import type { types as iamTypes } from "../../";

import * as models from "../db/models";

@injectable()
export class UserService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  constructor() {
    // Initialize repositories when AppDataSource is ready
  }

  /**
   * Login - Authenticate a user with email and password
   *
   * @param email - The user's email address
   * @param password - The user's password (will be hashed for comparison)
   * @returns Promise resolving to the authenticated user object
   * @throws {APIError} 401 UNAUTHORIZED if credentials are invalid
   */
  public async userLogIn(
    email: string,
    password: string
  ): Promise<iamTypes.entities.user.User> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // hash password
        const hashedPassword = utils.hashedPassword(password);
        // get by email
        const response = await em.findOneBy(models.User, {
          email: email,
          password: hashedPassword,
        });
        if (!response) {
          throw new errors.APIError(401, "UNAUTHORIZED", "Unauthorized");
        }
        return response;
      }
    )) as iamTypes.entities.user.User;
    return response;
  }

  /**
   * Get User - Retrieve a single user by their unique identifier
   *
   * @param userId - The unique identifier (uid) of the user
   * @returns Promise resolving to the user object with their details
   * @throws {APIError} 404 NOT_FOUND if the user does not exist
   */
  public async getUser(userId: string): Promise<iamTypes.entities.user.User> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid
        const user = await em.getRepository(models.User).findOne({
          where: { uid: userId },
          relations: ["groups"],
        });

        if (!user) {
          throw new errors.APIError(404, "NOT_FOUND", "User not found");
        }

        return {
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
            description: group.description,
            permissions: group.permissions,
          })),
        };
      }
    )) as iamTypes.entities.user.User;
    return response;
  }

  /**
   * Get Users - Retrieve all users in the system
   *
   * @returns Promise resolving to an array of all user objects with complete details including groups, status, and timestamps
   */
  public async getUsers(
    filter: iamTypes.entities.common.filter
  ): Promise<Array<iamTypes.entities.user.User>> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<any> = [];

        // TO DO pagination and filters
        const users = await em.find(models.User, filter);

        for (const user of users) {
          responseArray.push({
            uid: user.uid,
            email: user.email,
            age: user.age,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            status: user.status,
            isActive: user.isActive,
            isVerified: user.isVerified,
            magicLink: user.magicLink,
            magicLinkExpireDate: user.magicLinkExpireDate,
            disabledAt: user.disabledAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            verifiedAt: user.verifiedAt,
            groups: user.groups,
          });
        }
        return responseArray;
      }
    )) as Array<iamTypes.entities.user.User>;
    return response;
  }

  /**
   * Update User - Update user profile information
   *
   * @param params - Object containing the user's uid
   * @param document - Object containing the fields to update (firstName, lastName, phoneNumber)
   * @returns Promise resolving to the update result
   */
  public async updateUser(
    params: iamTypes.api.v1.users.PUT.Params,
    document: iamTypes.api.v1.users.PUT.RequestBody
  ): Promise<iamTypes.entities.user.User> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.User,
          { uid: params.uid },
          {
            firstName: document.firstName,
            lastName: document.lastName,
            phoneNumber: document.phoneNumber,
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.user.User;
    return response;
  }

  /**
   * Post User - Create a new user with auto-generated credentials and magic link
   *
   * @param user - The user data including firstName, lastName, email, and password
   * @returns Promise resolving to the created user object
   * @throws {APIError} 409 CONFLICT if email already exists
   * @throws {APIError} 404 NOT_FOUND if default group does not exist
   * @description Generates a magic link for account activation. The magic link expires in 24 hours.
   */
  public async postUser(
    user: iamTypes.entities.user.UserPost
  ): Promise<iamTypes.entities.user.User> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // search if email is unique
        const isUnique = await em.findOneBy(models.User, {
          email: user.email,
        });

        if (isUnique) {
          throw new errors.APIError(409, "CONFLICT", "Email already exists");
        }

        // set magic link
        const magicLink = utils.generateMagicLink();
        // set random password
        const password = utils.hashedPassword(user.password);
        // set expiring date
        const expDate = new Date();
        const magicLinkExpireDate = new Date(
          expDate.getTime() + 24 * 60 * 60 * 1000
        ); // 1 day

        // fetch group entities
        const groups = await em.findOneBy(models.Group, {
          userType: coreTypes.enums.AuthUserType.USER,
          default: true,
        });
        if (!groups) {
          throw new errors.APIError(
            404,
            "NOT_FOUND",
            "Default group not found"
          );
        }
        // create user
        const newUser = em.create(models.User, {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: password,
          groups: [groups],
          isActive: true,
          isVerified: false,
          status: coreTypes.enums.UserStatus.PENDING,
          magicLink,
          magicLinkExpireDate,
        });

        const response = await em.save(newUser);
        return response;
      }
    )) as iamTypes.entities.user.User;
    return response;
  }

  /**
   * Get User By Magic Link - Retrieve a user by their magic link token
   *
   * @param magicLink - The magic link token
   * @returns Promise resolving to the user object associated with the magic link
   * @description Used during account activation or password reset flows
   */
  public async getUserByMagicLink(
    magicLink: string
  ): Promise<iamTypes.entities.user.User> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by magic link
        const response = await em.findOneBy(models.User, {
          magicLink,
        });
        return response;
      }
    )) as iamTypes.entities.user.User;
    return response;
  }

  /**
   * Activate User - Activate a user account using their magic link
   *
   * @param magicLink - The magic link token
   * @param payload - Object containing additional user information to update during activation
   * @returns Promise resolving to the activation result
   * @description Sets user status to ACTIVE, marks as verified, clears magic link, and updates verification timestamp
   */
  public async activateUser(
    magicLink: string,
    payload: Partial<iamTypes.entities.user.User>
  ): Promise<iamTypes.entities.user.User> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // update by magic link
        const updateResult = await em.update(
          models.User,
          { magicLink },
          {
            ...payload,
            isActive: true,
            isVerified: true,
            status: coreTypes.enums.UserStatus.ACTIVE,
            verifiedAt: new Date(),
            magicLink: null,
            magicLinkExpireDate: null,
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.user.User;
    return response;
  }
  /**
   * Update Groups - Update the group memberships for a user
   *
   * @param uid - The user's uid
   * @param document - Object containing the new groups to assign to the user
   * @returns Promise resolving to the updated user object
   * @throws {APIError} 404 NOT_FOUND if the user does not exist
   * @description Replaces the user's existing groups with the new set of groups
   */
  public async updateGroupsToUser(
    uid: string,
    document: Partial<iamTypes.entities.user.User>
  ): Promise<iamTypes.entities.user.User> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get group entities
        const groups = await em.find(models.Group, {
          where: {
            userType: coreTypes.enums.AuthUserType.USER,
            uid: document.groups.map((gr: any) => gr.value) as any,
          },
        });

        // find admin user
        const user = await em.findOneBy(models.User, {
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
    )) as iamTypes.entities.user.User;
    return response;
  }

  /**
   * Disable User - Disable a user account
   *
   * @param uid - The user's uid
   * @returns Promise resolving to the update result
   * @description Sets user status to DISABLED, marks as inactive, and records the disable timestamp
   */
  public async disableUser(uid: string): Promise<iamTypes.entities.user.User> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.User,
          { uid },
          {
            status: coreTypes.enums.UserStatus.DISABLED,
            isActive: false,
            disabledAt: new Date(),
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.user.User;
    return response;
  }

  /**
   * Enable User - Enable a user account
   *
   * @param uid - The user's uid
   * @returns Promise resolving to the update result
   * @description Sets user status to ACTIVE, marks as active, and clears the disable timestamp
   */
  public async enableUser(uid: string): Promise<iamTypes.entities.user.User> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.User,
          { uid },
          {
            status: coreTypes.enums.UserStatus.ACTIVE,
            isActive: true,
            disabledAt: null,
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.user.User;
    return response;
  }

  /**
   * Hard Delete User - Permanently delete a user account
   *
   * @param uid - The user's uid
   * @returns Promise resolving to the delete result
   * @description Performs a hard delete - the user record is permanently removed and cannot be recovered
   */
  public async hardDeleteUser(
    uid: string
  ): Promise<iamTypes.entities.user.User> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const deleteResult = await em.delete(models.User, {
          uid,
        });
        return deleteResult;
      }
    )) as iamTypes.entities.user.User;
    return response;
  }
}
