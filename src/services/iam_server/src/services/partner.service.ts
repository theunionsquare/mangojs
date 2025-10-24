import { inject, injectable } from "inversify";
import { INVERSITY_TYPES, IPersistenceContext } from "@giusmento/mangojs-core";
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
   * Create a new partner company
   *
   * @param partner - The partner data including companyName, email, and other business information
   * @returns Promise resolving to the created partner object
   * @throws {APIError} 409 CONFLICT if email already exists
   * @description Creates a new partner company with PENDING status
   */
  public async post(
    partner: iamTypes.api.v1.partners.POST.RequestBody
  ): Promise<iamTypes.api.v1.partners.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // search if email is unique
        const isUnique = await em.findOneBy(Partner, {
          email: partner.email,
        });

        if (isUnique) {
          throw new errors.APIError(409, "CONFLICT", "Email already exists");
        }

        // create partner
        const newPartner = em.create(Partner, {
          companyName: partner.companyName,
          businessType: partner.businessType,
          taxId: partner.taxId,
          email: partner.email,
          phoneNumber: partner.phoneNumber,
          addressStreet: partner.addressStreet,
          addressCity: partner.addressCity,
          addressState: partner.addressState,
          addressCountry: partner.addressCountry,
          addressPostalCode: partner.addressPostalCode,
          websiteUrl: partner.websiteUrl,
          logoUrl: partner.logoUrl,
          subscriptionTier: partner.subscriptionTier,
          contractStartDate: partner.contractStartDate,
          contractEndDate: partner.contractEndDate,
          status: iamTypes.enums.PartnerStatus.PENDING,
          isVerified: false,
        });

        const response = await em.save(newPartner);
        return response;
      }
    )) as iamTypes.api.v1.partners.ResponseBodyData;
    return response;
  }

  /**
   * Retrieve a single partner by their unique identifier
   *
   * @param partnerId - The unique identifier (uid) of the partner
   * @returns Promise resolving to the partner object with their details
   * @throws {APIError} 404 NOT_FOUND if the partner does not exist
   */
  public async get(
    partnerId: string
  ): Promise<iamTypes.api.v1.partners.ResponseBodyData> {
    const response = (await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // get by uid with partner users
        const partner = await em.findOneBy(Partner, { uid: partnerId });

        if (!partner) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner not found");
        }

        return partner;
      }
    )) as IPartner;
    return response;
  }

  /**
   * Retrieve all partners in the system
   *
   * @returns Promise resolving to an array of all partner objects with complete details
   */
  public async getAll(): Promise<IPartner[]> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const partners = await em.find(Partner, {
          relations: ["partnerUsers"],
        });
        return partners;
      }
    );
    return response as IPartner[];
  }

  /**
   * Update partner company information
   *
   * @param params - Object containing the partner's uid
   * @param document - Object containing the fields to update
   * @returns Promise resolving to the update result
   * @throws {APIError} 404 NOT_FOUND if the partner does not exist
   */
  public async update(
    params: iamTypes.api.v1.partners.PUT.Params,
    document: iamTypes.api.v1.partners.PUT.RequestBody
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // check if partner exists
        const partner = await em.findOneBy(Partner, { uid: params.uid });

        if (!partner) {
          throw new errors.APIError(404, "NOT_FOUND", "Partner not found");
        }

        const updateResult = await em.update(
          Partner,
          { uid: params.uid },
          {
            companyName: document.companyName,
            businessType: document.businessType,
            taxId: document.taxId,
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
    );
    return response;
  }

  /**
   * Disable a partner company
   *
   * @param params - Object containing the partner's uid
   * @returns Promise resolving to the update result
   * @description Sets partner status to DISABLED and records the disable timestamp
   */
  public async disable(
    params: iamTypes.api.v1.partners.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          Partner,
          { uid: params.uid },
          {
            status: iamTypes.enums.PartnerStatus.DISABLED,
            disabledAt: new Date(),
          }
        );
        return updateResult;
      }
    );
    return response;
  }

  /**
   * Enable a partner company
   *
   * @param params - Object containing the partner's uid
   * @returns Promise resolving to the update result
   * @description Sets partner status to ENABLED and clears the disable timestamp
   */
  public async enable(
    params: iamTypes.api.v1.partners.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        const updateResult = await em.update(
          Partner,
          { uid: params.uid },
          {
            status: iamTypes.enums.PartnerStatus.ACTIVE,
            disabledAt: null,
          }
        );
        return updateResult;
      }
    );
    return response;
  }

  /**
   * Permanently delete a partner from the database
   *
   * @param params - Object containing the partner's uid
   * @returns Promise resolving to the delete result
   * @throws {APIError} 400 BAD_REQUEST if partner has associated users
   * @description Performs a hard delete - the partner record is permanently removed and cannot be recovered
   */
  public async hardDelete(
    params: iamTypes.api.v1.partners.PUT.Params
  ): Promise<{}> {
    const response = await this._persistenceContext.inTransaction(
      async (em: EntityManager) => {
        // Check if partner has users
        const partner = await em.findOne(Partner, {
          where: { uid: params.uid },
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
          uid: params.uid,
        });
        return deleteResult;
      }
    );
    return response;
  }
}
