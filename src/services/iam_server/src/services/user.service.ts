import { inject, injectable } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext } from "@giusmento/mangojs-core";
import { Repository, EntityManager } from "typeorm";
import { errors, utils } from "@giusmento/mangojs-core";
import { api } from "../types";

import { User, IUser } from "../db/models/User.entity";

@injectable()
export class UserService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  private userRepository: Repository<User>;

  constructor() {
    // Initialize repositories when AppDataSource is ready
  }

  /**
   * LogIn User
   * @param email
   * @param password
   * @returns
   */
  public async userLogIn(email: string, password: string): Promise<IUser> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // hash password
        const hashedPassword = utils.hashedPassword(password);
        // get by email
        const response = await em.findOneBy(User, {
          email: email,
          password: hashedPassword,
        });
        if (!response) {
          throw new errors.APIError(401, "UNAUTHORIZED", "Unauthorized");
        }
        return response;
      }
    );
    return response as IUser;
  }

  /**
   * Get User
   * @param userId
   * @returns
   */
  public async getUser(userId: string): Promise<IUser> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid
        const user = await this.userRepository.findOne({
          where: { uid: userId },
        });

        if (!user) {
          throw new errors.APIError(404, "NOT_FOUND", "User not found");
        }

        return {
          uid: user.uid,
          username: user.username,
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
    )) as IUser;
    return response;
  }

  /**
   * Get list of Users
   */
  public async getUsers(): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const responseArray: Array<any> = [];

        const users = await this.userRepository.find();

        for (const user of users) {
          responseArray.push({
            uid: user.uid,
            username: user.username,
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
   * Create User
   */
  public async postUser(
    user: api.v1.adminUser.POST.RequestBody
  ): Promise<api.v1.adminUser.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // search if email is unique
        const isUnique = await this.userRepository.findOne({
          where: { email: user.email },
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

        // create user
        const newUser = this.userRepository.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: password,
          groups: user.groups as string[],
          isActive: true,
          isVerified: false,
          status: "PENDING",
          magicLink,
          magicLinkExpireDate,
        });

        const response = await this.userRepository.save(newUser);
        return response;
      }
    )) as api.v1.adminUser.ResponseBodyData;
    return response;
  }
}
