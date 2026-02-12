import { inject, injectable } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext } from "@theunionsquare/mangojs-core";
import mongoose from "mongoose";
import { errors, utils } from "@theunionsquare/mangojs-core";
//import { AdminUser } from "../types/adminUser.type";
//import { api } from "../types";
//import { AdminGroupService } from "./AdminGroup.service";

import PartnerUserSchema, {
  IPartnerUser,
} from "../../db/models/PartnerUser.model";
import { api } from "../../types";
//import AdminGroupSchema, { IAdminGroup } from "../db/models/AdminGroup.model";

@injectable()
export class PartnerUserService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  /**
   * LogIn AdminUser
   * @param username
   * @param password
   * @returns
   */

  public async partnerUserLogIn(
    email: string,
    password: string
  ): Promise<IPartnerUser> {
    const response = await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        // get by id
        const partnerUser = await PartnerUserSchema.findOne({
          email: email,
        }).exec();
        if (!partnerUser) {
          throw new errors.APIError(401, "UNAUTHORIZED", "Unauthorized");
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
    return response as IPartnerUser;
  }

  /**
   * Get AdminUser
   * @param adminUserId
   * @returns
   */

  public async getPartnerUser(adminUserId: string): Promise<IPartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        // get by id
        const adminUser = await PartnerUserSchema.findOne({
          uid: adminUserId,
        }).populate("groups");
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
    )) as IPartnerUser;
    return response;
  }

  public async getPartnerUsers(): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        const response: Array<{}> = [];

        const filter = {};
        const users = await PartnerUserSchema.find(filter).populate("groups");
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
            groups: adminUser.groups,
          });
        }
        return response;
      }
    );
    return response;
  }

  /**
   * Create Admin User
   */
  public async postPartnerUser(
    partnerUser: api.v1.adminUser.POST.RequestBody
  ): Promise<api.v1.adminUser.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        // search if email is unique
        const isUnique = await PartnerUserSchema.findOne({
          email: partnerUser.email,
        });

        // get group id
        console.log({ partnerUser }, "search group UID");
        //const respGroup = await PartnerGroupSchema.findOne({
        //  uid: partnerUser.groups,
        //});
        // set group _id
        //partnerUser.groups = [respGroup._id];
        // set magic link
        const magicLink = utils.generateMagicLink();
        // set random password
        const password = utils.generateRandomPassword();
        // set expiring date
        const expDate = new Date();
        const magicLinkExpireDate = expDate.setDate(expDate.getDate() + 1);
        // create admin user
        const response = await PartnerUserSchema.create({
          uid: utils.generateUUID(),
          firstName: partnerUser.firstName,
          lastName: partnerUser.lastName,
          email: partnerUser.email,
          password: password,
          //groups: partnerUser.groups,
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
}
