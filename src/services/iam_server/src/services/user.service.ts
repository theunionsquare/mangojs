import { inject, injectable } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext } from "@giusmento/mangojs-core";
import { Repository, EntityManager } from "typeorm";
import { errors, utils } from "@giusmento/mangojs-core";
import { Types as coreTypes } from "@giusmento/mangojs-core";
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
   * LogIn User
   * @param email
   * @param password
   * @returns
   */
  public async userLogIn(
    email: string,
    password: string
  ): Promise<models.IUser> {
    const response = await this._persistenceContext.inTransaction(
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
    );
    return response as models.IUser;
  }

  /**
   * Get User
   * @param userId
   * @returns
   */
  public async getUser(userId: string): Promise<models.IUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid
        const user = await em.findOneBy(models.User, {
          uid: userId,
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
          groups: user.groups,
        };
      }
    )) as models.IUser;
    return response;
  }

  /**
   * Get list of Users
   */
  public async getUsers(): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<any> = [];

        // TO DO pagination and filters
        const users = await em.find(models.User);

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
    );
    return response;
  }

  /**
   * Update User
   */
  public async updateUser(
    params: iamTypes.api.v1.users.PUT.Params,
    document: iamTypes.api.v1.users.PUT.RequestBody
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
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
    );
    return response;
  }

  /**
   * Create User
   */
  public async postUser(
    user: iamTypes.api.v1.users.POST.RequestBody
  ): Promise<iamTypes.api.v1.users.ResponseBodyData> {
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
          userType: coreTypes.entities.AuthUserType.USER,
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
          status: "PENDING",
          magicLink,
          magicLinkExpireDate,
        });

        const response = await em.save(newUser);
        return response;
      }
    )) as iamTypes.api.v1.users.ResponseBodyData;
    return response;
  }

  /**
   * Get User by magic link
   * @param params
   * @returns
   */
  public async getUserByMagicLink(
    params: iamTypes.api.v1.users.magiclinks.GET.Params
  ): Promise<iamTypes.api.v1.users.magiclinks.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by magic link
        const response = await em.findOneBy(models.User, {
          magicLink: params.magiclink,
        });
        return response;
      }
    )) as iamTypes.api.v1.users.magiclinks.ResponseBodyData;
    return response;
  }

  /**
   * Activate User by magic link
   * @param params
   * @param payload
   * @returns
   */
  public async activateUser(
    params: iamTypes.api.v1.users.activate.POST.Params,
    payload: iamTypes.api.v1.users.activate.POST.RequestBody
  ): Promise<iamTypes.api.v1.users.activate.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // update by magic link
        const updateResult = await em.update(
          models.User,
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
    )) as iamTypes.api.v1.users.activate.ResponseBodyData;
    return response;
  }
  /**
   * Update User Groups
   */
  public async updateGroupsToUser(
    params: iamTypes.api.v1.users.groups.POST.Params,
    document: iamTypes.api.v1.users.groups.POST.RequestBody
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get group entities
        const groups = await em.find(models.Group, {
          where: {
            userType: coreTypes.entities.AuthUserType.USER,
            uid: document.groups.map((gr: any) => gr.value) as any,
          },
        });

        // find admin user
        const user = await em.findOneBy(models.User, {
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
   * Disable User
   */
  public async disableUser(
    params: iamTypes.api.v1.users.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.User,
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
   * Enable User
   */
  public async enableUser(
    params: iamTypes.api.v1.users.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.User,
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
   * Hard Delete User
   */
  public async hardDeleteUser(
    params: iamTypes.api.v1.users.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const deleteResult = await em.delete(models.User, {
          uid: params.uid,
        });
        return deleteResult;
      }
    );
    return response;
  }
}
