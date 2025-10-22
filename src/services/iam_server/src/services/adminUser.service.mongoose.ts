import { inject, injectable } from "inversify";
import {
  INVERSITY_TYPES,
  IPersistenceContext,
  Types,
} from "@giusmento/mangojs-core";
import mongoose from "mongoose";
import { errors, utils } from "@giusmento/mangojs-core";
import { api } from "../types";

import AdminUserSchema, { IAdminUser } from "../db/models/AdminUser.model";
import AdminGroupSchema from "../db/models/Group.model";

@injectable()
export class AdminUserService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

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
      async (em: mongoose.Connection) => {
        // get by id
        const adminUser = await AdminUserSchema.findOne({
          email: email,
        }).exec();
        if (!adminUser) {
          throw new errors.APIError(401, "UNAUTHORIZED", "Unauthorized");
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
          //groups: adminUser.groups.map((gr) => {
          //  return {
          //    uid: gr.uid,
          //    name: gr.name,
          //    description: gr.description,
          //    permissions: gr.permissions,
          //  };
          //}),
        };
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
      async (em: mongoose.Connection) => {
        // get by id
        const adminUser = await AdminUserSchema.findOne({
          uid: adminUserId,
        }); //.populate("groups");

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
          //groups: adminUser.groups.map((gr) => {
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
   * Get AdminUser
   * @param adminUserId
   * @returns
   */

  public async getAdminUserByUsername(username: string): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        // get by id
        const response = await AdminUserSchema.findOne({
          username: username,
        });
        return response;
      }
    );
    return response;
  }

  /**
   * Get AdminUser by magic link
   * @param adminUserId
   * @returns
   */

  public async getAdminUserByMagicLink(
    params: api.v1.adminUser.magiclinks.GET.Params
  ): Promise<api.v1.adminUser.magiclinks.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        // get by id
        const response = await AdminUserSchema.findOne({
          magicLink: params.magiclink,
        });
        return response;
      }
    )) as api.v1.adminUser.magiclinks.ResponseBodyData;
    return response;
  }

  /**
   * Get AdminUser by magic link
   * @param adminUserId
   * @returns
   */

  public async activateAdminUser(
    params: api.v1.adminUser.activate.POST.Params,
    payload: api.v1.adminUser.activate.POST.RequestBody
  ): Promise<api.v1.adminUser.activate.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        // get by id
        const response = await AdminUserSchema.updateOne(
          {
            magicLink: params.magiclink,
          },
          {
            ...payload,
            ...{
              isActive: true,
              isVerified: true,
              status: "ENABLED",
              activateAt: Date.now(),
              verifiedAt: Date.now(),
              magicLink: undefined,
              magicLinkExpireDate: "",
            },
          }
        );
        return response;
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
      async (em: mongoose.Connection) => {
        // search if email is unique
        const isUnique = await AdminUserSchema.findOne({
          email: adminUser.email,
        });

        // get group id
        console.log({ adminUser }, "search group UID");
        const respGroup = await AdminGroupSchema.findOne({
          userType: Types.entities.AuthUserType.ADMIN,
          uid: adminUser.groups,
        });
        // set group _id
        adminUser.groups = [respGroup._id as string];
        // set magic link
        const magicLink = utils.generateMagicLink();
        // set random password
        const password = utils.generateRandomPassword();
        // set expiring date
        const expDate = new Date();
        const magicLinkExpireDate = expDate.setDate(expDate.getDate() + 1);
        // create admin user
        const response = await AdminUserSchema.create({
          uid: utils.generateUUID(),
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          email: adminUser.email,
          password: password,
          groups: adminUser.groups,
          isActive: true,
          isVerified: false,
          status: "PENDING",
          magicLink,
          magicLinkExpireDate,
        });
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
      async (em: mongoose.Connection) => {
        const response: Array<api.v1.adminUser.ResponseBodyData> = [];

        const filter = {};
        const users = await AdminUserSchema.find(filter).populate("groups");
        //console.log({ users });
        for (const adminUser of users) {
          response.push({
            uid: adminUser.uid,
            username: adminUser.username,
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
            groups: adminUser.groups.map((gr) => {
              return {
                uid: gr.uid,
                name: gr.name,
                description: gr.description,
                permissions: gr.permissions,
              };
            }),
          });
        }
        return response;
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
      async (em: mongoose.Connection) => {
        const users = await AdminUserSchema.updateOne(
          { uid: params.uid },
          {
            firstName: document.firstName,
            lastName: document.lastName,
            phoneNumber: document.phoneNumber,
          }
        );
        return users;
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
      async (em: mongoose.Connection) => {
        // get group ids
        const grIds = await AdminGroupSchema.find({
          userType: Types.entities.AuthUserType.ADMIN,
          uid: document.groups.map((gr) => gr.value),
        });

        const users = await AdminUserSchema.updateOne(
          { uid: params.uid },
          {
            groups: grIds,
          }
        );
        return users;
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
      async (em: mongoose.Connection) => {
        const users = await AdminUserSchema.updateOne(
          { uid: params.uid },
          {
            status: "DISABLED",
            isActive: false,
            disabled: Date.now(),
          }
        );
        return users;
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
      async (em: mongoose.Connection) => {
        const users = await AdminUserSchema.updateOne(
          { uid: params.uid },
          {
            status: "ENABLED",
            isActive: true,
            disabled: undefined,
          }
        );
        return users;
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
      async (em: mongoose.Connection) => {
        const users = await AdminUserSchema.deleteOne({
          uid: params.uid,
        });
        return users;
      }
    );
    return response;
  }
}
