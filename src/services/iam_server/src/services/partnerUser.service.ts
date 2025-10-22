import { inject, injectable } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext } from "@giusmento/mangojs-core";
import { Repository, EntityManager } from "typeorm";
import { errors, utils } from "@giusmento/mangojs-core";
import { api } from "../types";

import { PartnerUser, IPartnerUser } from "../db/models/PartnerUser.entity";

@injectable()
export class PartnerUserService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  private partnerUserRepository: Repository<PartnerUser>;

  constructor() {
    // Initialize repositories when AppDataSource is ready
  }

  /**
   * LogIn PartnerUser
   * @param email
   * @param password
   * @returns
   */
  public async partnerUserLogIn(
    email: string,
    password: string
  ): Promise<IPartnerUser> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // hash password
        const hashedPassword = utils.hashedPassword(password);
        // get by email
        const response = await em.findOneBy(PartnerUser, {
          email: email,
          password: hashedPassword,
        });
        if (!response) {
          throw new errors.APIError(401, "UNAUTHORIZED", "Unauthorized");
        }
        return response;
      }
    );
    return response as IPartnerUser;
  }

  /**
   * Get PartnerUser
   * @param partnerUserId
   * @returns
   */
  public async getPartnerUser(partnerUserId: string): Promise<IPartnerUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid
        const partnerUser = await this.partnerUserRepository.findOne({
          where: { uid: partnerUserId },
        });

        if (!partnerUser) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner user not found");
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
          groups: partnerUser.groups,
        };
      }
    )) as IPartnerUser;
    return response;
  }

  /**
   * Get list of Partner Users
   */
  public async getPartnerUsers(): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<any> = [];

        const users = await this.partnerUserRepository.find();

        for (const partnerUser of users) {
          responseArray.push({
            uid: partnerUser.uid,
            username: partnerUser.username,
            email: partnerUser.email,
            age: partnerUser.age,
            phoneNumber: partnerUser.phoneNumber,
            firstName: partnerUser.firstName,
            lastName: partnerUser.lastName,
            status: partnerUser.status,
            isActive: partnerUser.isActive,
            isVerified: partnerUser.isVerified,
            magicLink: partnerUser.magicLink,
            magicLinkExpireDate: partnerUser.magicLinkExpireDate,
            disabledAt: partnerUser.disabledAt,
            createdAt: partnerUser.createdAt,
            updatedAt: partnerUser.updatedAt,
            verifiedAt: partnerUser.verifiedAt,
            groups: partnerUser.groups,
          });
        }
        return responseArray;
      }
    );
    return response;
  }

  /**
   * Create Partner User
   */
  public async postPartnerUser(
    partnerUser: api.v1.adminUser.POST.RequestBody
  ): Promise<api.v1.adminUser.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // search if email is unique
        const isUnique = await this.partnerUserRepository.findOne({
          where: { email: partnerUser.email },
        });

        if (isUnique) {
          throw new errors.APIError(409, "CONFLICT", "Email already exists");
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

        // create partner user
        const newPartnerUser = this.partnerUserRepository.create({
          firstName: partnerUser.firstName,
          lastName: partnerUser.lastName,
          email: partnerUser.email,
          password: password,
          groups: partnerUser.groups as string[],
          isActive: true,
          isVerified: false,
          status: "PENDING",
          magicLink,
          magicLinkExpireDate,
        });

        const response = await this.partnerUserRepository.save(newPartnerUser);
        return response;
      }
    )) as api.v1.adminUser.ResponseBodyData;
    return response;
  }
}
