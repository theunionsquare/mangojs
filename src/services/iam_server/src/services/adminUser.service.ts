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
   * LogIn AdminUser
   * @param username
   * @param password
   * @returns
   */
  public async AdminUserLogIn(
    email: string,
    password: string
  ): Promise<models.IAdminUser> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by email
        const response = await em.findOneBy(models.AdminUser, { email: email });
        //const response = await this.adminUserRepository.findOne({
        //    where: { email: email }
        //})
        if (!response) {
          throw new errors.APIError(401, "UNAUTHORIZED", "Unauthorized");
        }
        return response;
      }
    );
    return response as models.IAdminUser;
  }

  /**
   * Get AdminUser
   * @param adminUserId
   * @returns
   */
  public async getAdminUser(adminUserId: string): Promise<models.IAdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid
        const adminUser = await em.findOneBy(models.AdminUser, {
          uid: adminUserId,
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
    )) as models.IAdminUser;
    return response;
  }

  /**
   * Get AdminUser by username
   * @param username
   * @returns
   */
  public async getAdminUserByUsername(username: string): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by username
        const response = await em.findOneBy(models.AdminUser, {
          username: username,
        });
        return response;
      }
    );
    return response;
  }

  /**
   * Get AdminUser by magic link
   * @param params
   * @returns
   */
  public async getAdminUserByMagicLink(
    params: api.v1.adminUser.magiclinks.GET.Params
  ): Promise<api.v1.adminUser.magiclinks.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by magic link
        const response = await this.adminUserRepository.findOne({
          where: { magicLink: params.magiclink },
        });
        return response;
      }
    )) as api.v1.adminUser.magiclinks.ResponseBodyData;
    return response;
  }

  /**
   * Activate AdminUser by magic link
   * @param params
   * @param payload
   * @returns
   */
  public async activateAdminUser(
    params: api.v1.adminUser.activate.POST.Params,
    payload: api.v1.adminUser.activate.POST.RequestBody
  ): Promise<api.v1.adminUser.activate.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // update by magic link
        const updateResult = await em.update(
          models.AdminUser,
          { magicLink: params.magiclink },
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
    )) as api.v1.adminUser.activate.ResponseBodyData;
    return response;
  }

  /**
   * Create Admin User
   */
  public async postAdminUser(
    adminUser: api.v1.adminUser.POST.RequestBody
  ): Promise<api.v1.adminUser.ResponseBodyData> {
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
            uid: adminUser.groups as any,
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
    )) as api.v1.adminUser.ResponseBodyData;
    return response;
  }

  /**
   * Get list of active Admin Users
   */
  public async getAdminUsers(): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<api.v1.adminUser.ResponseBodyData> = [];

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
            groups: adminUser.groups?.map((gr: any) => {
              return {
                uid: gr.uid,
                name: gr.name,
                description: gr.description,
                permissions: gr.permissions,
              };
            }),
          });
        }
        return responseArray;
      }
    );
    return response;
  }

  /**
   * Update Admin User
   */
  public async updateAdminUser(
    params: api.v1.adminUser.PUT.Params,
    document: api.v1.adminUser.PUT.RequestBody
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.AdminUser,
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
   * Update Admin Groups
   */
  public async updateGroupsToAdminUser(
    params: api.v1.adminUser.groups.POST.Params,
    document: api.v1.adminUser.groups.POST.RequestBody
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get group entities
        const groups = await em.find(models.Group, {
          where: {
            userType: Types.enums.AuthUserType.ADMIN,
            uid: document.groups.map((gr: any) => gr.value) as any,
          },
        });

        // find admin user
        const adminUser = await em.findOneBy(models.AdminUser, {
          uid: params.uid,
        });

        if (!adminUser) {
          throw new errors.APIError(404, "NOT_FOUND", "Admin user not found");
        }

        // update groups
        adminUser.groups = groups;
        const updateResult = await em.save(adminUser);
        return updateResult;
      }
    );
    return response;
  }

  /**
   * Disable Admin User
   */
  public async disableAdminUser(
    params: api.v1.adminUser.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.AdminUser,
          { uid: params.uid },
          {
            status: Types.enums.AdminUserStatus.DISABLED,
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
   * Enable Admin User
   */
  public async enableAdminUser(
    params: api.v1.adminUser.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          models.AdminUser,
          { uid: params.uid },
          {
            status: Types.enums.AdminUserStatus.ACTIVE,
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
   * Hard Delete Admin User
   */
  public async hardDeleteAdminUser(
    params: api.v1.adminUser.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const deleteResult = await em.delete(models.AdminUser, {
          uid: params.uid,
        });
        return deleteResult;
      }
    );
    return response;
  }
}
