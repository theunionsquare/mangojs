import { inject, injectable, LazyServiceIdentifier } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext, Types } from "@mangojs/core";
import { Repository, EntityManager } from "typeorm";
import { errors, utils } from "@mangojs/core";
import { APITYPE } from "../types";

import { AdminUser, IAdminUser } from "../db/models/AdminUser.entity";
import { Group } from "../db/models/Group.entity";

@injectable()
export class AdminUserService {
  // Inject Persistance Context
  @inject(new LazyServiceIdentifier(() => INVERSITY_TYPES.PersistenceContext))
  private _persistenceContext: IPersistenceContext;

  private adminUserRepository: Repository<AdminUser>;
  private groupRepository: Repository<Group>;

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
  ): Promise<IAdminUser> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by email
        const response = await em.findOneBy(AdminUser, { email: email });
        //const response = await this.adminUserRepository.findOne({
        //    where: { email: email }
        //})
        if (!response) {
          throw new errors.APIError(401, "UNAUTHORIZED", "Unauthorized");
        }
        return response;
      }
    );
    return response as IAdminUser;
  }

  /**
   * Get AdminUser
   * @param adminUserId
   * @returns
   */
  public async getAdminUser(adminUserId: string): Promise<IAdminUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid
        const adminUser = await this.adminUserRepository.findOne({
          where: { uid: adminUserId },
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
    )) as IAdminUser;
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
        const response = await em.findOneBy(AdminUser, { username: username });
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
    params: APITYPE.V1.adminUser.magiclinks.GET.Params
  ): Promise<APITYPE.V1.adminUser.magiclinks.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by magic link
        const response = await this.adminUserRepository.findOne({
          where: { magicLink: params.magiclink },
        });
        return response;
      }
    )) as APITYPE.V1.adminUser.magiclinks.ResponseBodyData;
    return response;
  }

  /**
   * Activate AdminUser by magic link
   * @param params
   * @param payload
   * @returns
   */
  public async activateAdminUser(
    params: APITYPE.V1.adminUser.activate.POST.Params,
    payload: APITYPE.V1.adminUser.activate.POST.RequestBody
  ): Promise<APITYPE.V1.adminUser.activate.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // update by magic link
        const updateResult = await this.adminUserRepository.update(
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
    )) as APITYPE.V1.adminUser.activate.ResponseBodyData;
    return response;
  }

  /**
   * Create Admin User
   */
  public async postAdminUser(
    adminUser: APITYPE.V1.adminUser.POST.RequestBody
  ): Promise<APITYPE.V1.adminUser.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // search if email is unique
        console.log({ adminUser }, "search email");
        const isUnique = await em.findOne(AdminUser, {
          where: { email: adminUser.email },
        });

        if (isUnique) {
          throw new errors.APIError(409, "CONFLICT", "Email already exists");
        }

        // get group by uid
        console.log({ adminUser }, "search group UID");
        const respGroup = await em.findOne(Group, {
          where: {
            userType: Types.entities.AuthUserType.ADMIN,
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
        const newAdminUser = em.create(AdminUser, {
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          email: adminUser.email,
          password: password,
          groups: [respGroup],
          isActive: true,
          isVerified: false,
          status: "PENDING",
          magicLink,
          magicLinkExpireDate,
        });

        const response = await em.save(AdminUser, newAdminUser);
        return response;
      }
    )) as APITYPE.V1.adminUser.ResponseBodyData;
    return response;
  }

  /**
   * Get list of active Admin Users
   */
  public async getAdminUsers(): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<APITYPE.V1.adminUser.ResponseBodyData> = [];

        const users = await this.adminUserRepository.find({
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
    params: APITYPE.V1.adminUser.PUT.Params,
    document: APITYPE.V1.adminUser.PUT.RequestBody
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await this.adminUserRepository.update(
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
    params: APITYPE.V1.adminUser.groups.POST.Params,
    document: APITYPE.V1.adminUser.groups.POST.RequestBody
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get group entities
        const groups = await this.groupRepository.find({
          where: {
            userType: Types.entities.AuthUserType.ADMIN,
            uid: document.groups.map((gr: any) => gr.value) as any,
          },
        });

        // find admin user
        const adminUser = await this.adminUserRepository.findOne({
          where: { uid: params.uid },
          relations: ["groups"],
        });

        if (!adminUser) {
          throw new errors.APIError(404, "NOT_FOUND", "Admin user not found");
        }

        // update groups
        adminUser.groups = groups;
        const updateResult = await this.adminUserRepository.save(adminUser);
        return updateResult;
      }
    );
    return response;
  }

  /**
   * Disable Admin User
   */
  public async disableAdminUser(
    params: APITYPE.V1.adminUser.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await this.adminUserRepository.update(
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
   * Enable Admin User
   */
  public async enableAdminUser(
    params: APITYPE.V1.adminUser.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await this.adminUserRepository.update(
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
   * Hard Delete Admin User
   */
  public async hardDeleteAdminUser(
    params: APITYPE.V1.adminUser.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const deleteResult = await this.adminUserRepository.delete({
          uid: params.uid,
        });
        return deleteResult;
      }
    );
    return response;
  }
}
