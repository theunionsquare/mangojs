import { inject, injectable } from "inversify";
import {
  INVERSITY_TYPES,
  IPersistenceContext,
  Types,
} from "@giusmento/mangojs-core";
import { EntityManager } from "typeorm";
import { errors } from "@giusmento/mangojs-core";
import { Partner, IPartner } from "../db/models/Partner.entity";

import { types as iamTypes } from "../../";

@injectable()
export class PartnerService {
  // Inject Persistance Context
  @inject(INVERSITY_TYPES.PersistenceContext)
  private _persistenceContext: IPersistenceContext;

  constructor() {
    // Initialize repositories when AppDataSource is ready
  }

  /**
   * Post - Create a new partner company
   *
   * @param partner - The partner data including companyName, email, and other business information
   * @returns Promise resolving to the created partner object
   * @throws {APIError} 409 CONFLICT if tax ID already exists
   * @description Creates a new partner company with PENDING status
   */
  public async post(
    partner: iamTypes.entities.partner.PartnerPost
  ): Promise<iamTypes.entities.partner.Partner> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // check if taxCode is provided
        if (!partner.taxCode) {
          throw new errors.APIError(400, "BAD_REQUEST", "Tax Code is required");
        }
        // search if taxCode is unique
        const isUnique = await em.findOneBy(Partner, {
          taxCode: partner.taxCode,
        });

        if (isUnique) {
          throw new errors.APIError(409, "CONFLICT", "Tax ID already exists");
        }
        // search if email is unique
        const isEmailUnique = await em.findOneBy(Partner, {
          email: partner.email,
        });

        if (isEmailUnique) {
          throw new errors.APIError(409, "CONFLICT", "Email already exists");
        }

        // create partner
        const newPartner = em.create(Partner, {
          companyName: partner.companyName,
          businessType: partner.businessType,
          taxCode: partner.taxCode,
          email: partner.email,
          phoneNumber: partner.phoneNumber,
          addressStreet: partner.addressStreet,
          addressCity: partner.addressCity,
          addressState: partner.addressState,
          addressCountry: partner.addressCountry,
          addressPostalCode: partner.addressPostalCode,
          status: Types.enums.PartnerStatus.PENDING,
          isVerified: false,
        });

        const response = await em.save(newPartner);
        return response;
      }
    )) as iamTypes.entities.partner.Partner;
    return response;
  }

  /**
   * Get - Retrieve a single partner by their unique identifier
   *
   * @param uid - The unique identifier (uid) of the partner
   * @returns Promise resolving to the partner object with their details
   * @throws {APIError} 404 NOT_FOUND if the partner does not exist
   */
  public async get(uid: string): Promise<iamTypes.entities.partner.Partner> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid with partner users
        const partner = await em.findOneBy(Partner, { uid });

        if (!partner) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner not found");
        }

        return partner;
      }
    )) as iamTypes.entities.partner.Partner;
    return response;
  }

  /**
   * Get All - Retrieve all partners in the system
   *
   * @param filter - Filter criteria for querying partners
   * @returns Promise resolving to an array of all partner objects with complete details
   */
  public async getAll(
    filter: iamTypes.entities.common.filter
  ): Promise<Array<iamTypes.entities.partner.Partner>> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const partners = await em.find(Partner, {
          relations: ["partnerUsers"],
        });
        return partners;
      }
    );
    return response as Array<iamTypes.entities.partner.Partner>;
  }

  /**
   * Update - Update partner company information
   *
   * @param uid - The partner's uid
   * @param document - Object containing the fields to update
   * @returns Promise resolving to the update result
   * @throws {APIError} 404 NOT_FOUND if the partner does not exist
   */
  public async update(
    uid: string,
    document: Partial<iamTypes.entities.partner.Partner>
  ): Promise<iamTypes.entities.partner.Partner> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // check if partner exists
        const partner = await em.findOneBy(Partner, { uid });

        if (!partner) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner not found");
        }

        const updateResult = await em.update(
          Partner,
          { uid },
          {
            companyName: document.companyName,
            businessType: document.businessType,
            taxCode: document.taxCode,
            email: document.email,
            phoneNumber: document.phoneNumber,
            addressStreet: document.addressStreet,
            addressCity: document.addressCity,
            addressState: document.addressState,
            addressCountry: document.addressCountry,
            addressPostalCode: document.addressPostalCode,
            websiteUrl: document.websiteUrl,
            logoUrl: document.logoUrl,
            subscriptionTier: document.subscriptionTier,
            contractStartDate: document.contractStartDate,
            contractEndDate: document.contractEndDate,
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.partner.Partner;
    return response;
  }

  /**
   * Disable - Disable a partner company
   *
   * @param uid - The partner's uid
   * @returns Promise resolving to the update result
   * @description Sets partner status to DISABLED and records the disable timestamp
   */
  public async disable(
    uid: string
  ): Promise<iamTypes.entities.partner.Partner> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          Partner,
          { uid },
          {
            status: Types.enums.PartnerStatus.DISABLED,
            disabledAt: new Date(),
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.partner.Partner;
    return response;
  }

  /**
   * Enable - Enable a partner company
   *
   * @param uid - The partner's uid
   * @returns Promise resolving to the update result
   * @description Sets partner status to ACTIVE and clears the disable timestamp
   */
  public async enable(uid: string): Promise<iamTypes.entities.partner.Partner> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          Partner,
          { uid },
          {
            status: Types.enums.PartnerStatus.ACTIVE,
            disabledAt: null,
          }
        );
        return updateResult;
      }
    )) as iamTypes.entities.partner.Partner;
    return response;
  }

  /**
   * Hard Delete - Permanently delete a partner from the database
   *
   * @param uid - The partner's uid
   * @returns Promise resolving to the delete result
   * @throws {APIError} 404 NOT_FOUND if the partner does not exist
   * @throws {APIError} 400 BAD_REQUEST if partner has associated users
   * @description Performs a hard delete - the partner record is permanently removed and cannot be recovered
   */
  public async hardDelete(
    uid: string
  ): Promise<iamTypes.entities.partner.Partner> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // Check if partner has users
        const partner = await em.findOne(Partner, {
          where: { uid },
          relations: ["partnerUsers"],
        });

        if (!partner) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner not found");
        }

        if (partner.partnerUsers && partner.partnerUsers.length > 0) {
          throw new errors.APIError(
            400,
            "BAD_REQUEST",
            "Cannot delete partner with associated users. Please remove or reassign users first."
          );
        }

        const deleteResult = await em.delete(Partner, {
          uid,
        });
        return deleteResult;
      }
    )) as iamTypes.entities.partner.Partner;
    return response;
  }
}
