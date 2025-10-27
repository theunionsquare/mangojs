import { inject, injectable } from "inversify";
import {
  INVERSITY_TYPES,
  IPersistenceContext,
  Types,
} from "@giusmento/mangojs-core";
import { Repository, EntityManager } from "typeorm";
import { Group } from "../db/models/Group.entity";
import { api } from "../types";

@injectable()
export class GroupsService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  private groupRepository: Repository<Group>;

  constructor() {
    // Initialize repositories when AppDataSource is ready
  }

  /**
   * Get All Groups
   */
  public async getAllGroups(filter: any): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<api.v1.groups.ResponseBodyData> = [];

        // Convert filter if needed, for now use empty filter
        const groups = await em.find(Group, filter || {});

        for (const group of groups) {
          responseArray.push({
            userType: group.userType,
            uid: group.uid,
            name: group.name,
            default: group.default,
            description: group.description,
            permissions: group.permissions,
          });
        }
        return responseArray;
      }
    );
    return response;
  }

  /**
   * Delete Group by UID
   */
  public async deleteGroup(uid: string): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const deleteResult = await em.delete(Group, { uid });
        return deleteResult;
      }
    );
    return response;
  }

  /**
   * Get list of Groups by UserType
   */
  public async getGroups(userType: Types.enums.AuthUserType): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<api.v1.groups.admin.ResponseBodyData> = [];

        const groups = await em.find(Group, {
          where: { userType },
        });

        for (const group of groups) {
          responseArray.push({
            uid: group.uid,
            name: group.name,
            description: group.description,
            permissions: group.permissions,
          });
        }
        return responseArray;
      }
    );
    return response;
  }

  /**
   * Create Group
   */
  public async postGroup(
    userType: Types.enums.AuthUserType,
    groupData: api.v1.groups.ResponseBodyData
  ): Promise<api.v1.groups.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // id default is not boolean set false
        if (typeof groupData.default !== "boolean") {
          groupData.default = false;
        }
        const newGroup = em.create(Group, {
          userType: userType,
          name: groupData.name,
          default: groupData.default,
          description: groupData.description,
          permissions: groupData.permissions,
        });

        const savedGroup = await em.save(newGroup);

        return {
          uid: savedGroup.uid,
          name: savedGroup.name,
          description: savedGroup.description,
          permissions: savedGroup.permissions,
        };
      }
    )) as api.v1.groups.ResponseBodyData;
    return response;
  }
}
