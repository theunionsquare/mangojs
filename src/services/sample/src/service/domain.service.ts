import { inject, injectable } from "inversify";
import {
  INVERSITY_TYPES,
  IPersistenceContext,
  Types,
} from "@giusmento/mangojs-core";
import { DataSource, EntityManager } from "typeorm";
import { Photo } from "../db/models/Photo";

@injectable()
export class DomainService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  /**
   * Get All Groups
   */
  public async getDomains(filter: {}): Promise<{}> {
    //test conn

    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const photo = new Photo();
        photo.name = "Me and Bears";
        photo.description = "I am near polar bears";
        photo.filename = "photo.jpg";
        photo.views = 0;
        photo.isPublished = true;
        em.save(photo);
      }
    );
    return {};
  }
}
