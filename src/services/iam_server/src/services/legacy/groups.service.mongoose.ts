import { inject, injectable } from "inversify";
import {
  INVERSITY_TYPES,
  IPersistenceContext,
  Types,
} from "@theunionsquare/mangojs-core";
import mongoose from "mongoose";
import GroupSchema from "../../db/models/Group.model";
import { api } from "../../types";

@injectable()
export class GroupsService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  /**
   * Get All Groups
   */
  public async getAllGroups(filter: {}): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        const response: Array<api.v1.groups.ResponseBodyData> = [];

        const sqlFilter = filter;
        const groups = await GroupSchema.find(sqlFilter);
        for (const group of groups) {
          response.push({
            userType: group.userType,
            uid: group.uid,
            name: group.name,
            default: group.default,
            description: group.description,
            permissions: group.permissions,
          });
        }
        return response;
      }
    );
    return response;
  }

  /**
   * Get All Groups
   */
  public async deleteGroup(uid: string): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        const response: Array<api.v1.groups.ResponseBodyData> = [];

        const groups = await GroupSchema.deleteOne({ uid });
        return groups;
      }
    );
    return response;
  }

  /**
   * Get list of Admin Groups
   */
  public async getGroups(userType: Types.enums.AuthUserType): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        const response: Array<api.v1.groups.admin.ResponseBodyData> = [];

        const filter = { userType };
        const groups = await GroupSchema.find(filter);
        for (const adminGroup of groups) {
          response.push({
            uid: adminGroup.uid,
            name: adminGroup.name,
            description: adminGroup.description,
            permissions: adminGroup.permissions,
          });
        }
        return response;
      }
    );
    return response;
  }

  /**
   * Post Admin Groups
   */
  public async postGroup(
    userType: Types.enums.AuthUserType,
    adminGroup: api.v1.groups.ResponseBodyData
  ): Promise<api.v1.groups.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: mongoose.Connection) => {
        const group = {
          userType: userType,
          name: adminGroup.name,
          description: adminGroup.description,
          permissions: adminGroup.permissions,
        };
        const response = await GroupSchema.create(group);
        return {
          uid: response.uid,
          name: response.name,
          description: response.description,
          permissions: response.permissions,
        };
      }
    )) as api.v1.groups.ResponseBodyData;
    return response;
  }
}
