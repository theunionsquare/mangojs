import { inject, injectable } from "inversify";
import {
  INVERSITY_TYPES,
  IPersistenceContext,
  Types,
} from "@giusmento/mangojs-core";
import { EntityManager } from "typeorm";
import * as models from "../db/models";
import { types as iamTypes } from "../../";
import { Group } from "../db/models";

@injectable()
export class GroupsService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  constructor() {
    // Initialize repositories when AppDataSource is ready
  }

  /**
   * Get All Groups - Retrieve all groups from the database
   *
   * @param filter - Optional filter to apply
   * @returns Promise resolving to an array of all groups
   */
  public async getAllGroups(
    filter: iamTypes.entities.common.filter | undefined
  ): Promise<Array<iamTypes.entities.group.Group>> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<iamTypes.entities.group.Group> = [];

        // Convert filter if needed, for now use empty filter
        const groups = await em.find(models.Group, filter || {});

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
    )) as Array<iamTypes.entities.group.Group>;
    return response;
  }

  /**
   * Delete Group - Delete a group identified by its UID
   *
   * @param uid - The UID of the group to delete
   * @returns Promise resolving to the delete result with affected count
   */
  public async deleteGroup(
    uid: string
  ): Promise<iamTypes.entities.group.GroupDelete> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const deleteResult = await em.delete(models.Group, { uid });
        return deleteResult.affected
          ? { affected: deleteResult.affected }
          : { affected: 0 };
      }
    )) as iamTypes.entities.group.GroupDelete;
    return response;
  }

  /**
   * Get Groups - Retrieve groups based on user type
   *
   * @param userType - The type of user (e.g., ADMIN, PARTNER)
   * @param filter - Optional filter to apply
   * @returns Promise resolving to an array of groups matching the user type
   */
  public async getGroups(
    userType: Types.enums.AuthUserType,
    filter: iamTypes.entities.common.filter | undefined
  ): Promise<iamTypes.entities.group.Group[]> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<iamTypes.entities.group.Group> = [];

        const buildFilter = { ...{ userType }, ...(filter || {}) };
        const groups = await em.findBy(models.Group, buildFilter);

        for (const group of groups) {
          responseArray.push({
            uid: group.uid,
            name: group.name,
            description: group.description,
            permissions: group.permissions,
            userType: group.userType,
            default: group.default,
          });
        }
        return responseArray;
      }
    )) as iamTypes.entities.group.Group[];
    return response;
  }

  /**
   * Post Group - Create a new group in the database
   *
   * @param userType - The type of user the group is for
   * @param groupData - Data for the new group including name, description, and permissions
   * @returns Promise resolving to the created group object
   */
  public async postGroup(
    userType: Types.enums.AuthUserType,
    groupData: iamTypes.entities.group.GroupPost
  ): Promise<iamTypes.entities.group.Group> {
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
          userType: savedGroup.userType,
          default: savedGroup.default,
        };
      }
    )) as iamTypes.entities.group.Group;
    return response;
  }
}
