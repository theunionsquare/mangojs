import { injectable } from "inversify";
import { IEmailProvider, EmailPayload, EmailSendResult } from "./IEmailProvider";

/**
 * Factory for sending emails through configurable providers.
 *
 * @example
 * // Binding Option 1: Set provider later
 * container.bind<EmailServiceFactory>(TYPES.EmailServiceFactory).to(EmailServiceFactory);
 *
 * // Usage
 * const factory = container.get<EmailServiceFactory>(TYPES.EmailServiceFactory);
 * const brevoProvider = new BrevoProvider({ apiKey: '...', senderEmail: '...', senderName: '...' });
 * factory.setProvider(brevoProvider);
 * await factory.send({ receiver: '...', subject: '...', htmlContent: '...' });
 *
 * @example
 * // Binding Option 2: Set provider at bind time
 * const brevoProvider = new BrevoProvider({ apiKey: '...', senderEmail: '...', senderName: '...' });
 * container.bind<EmailServiceFactory>(TYPES.EmailServiceFactory)
 *   .toConstantValue(new EmailServiceFactory(brevoProvider));
 *
 * // Usage
 * const factory = container.get<EmailServiceFactory>(TYPES.EmailServiceFactory);
 * await factory.send({ receiver: '...', subject: '...', htmlContent: '...' });
 */
@injectable()
export class EmailServiceFactory {
  private provider: IEmailProvider | null = null;

  constructor(provider?: IEmailProvider) {
    if (provider) {
      this.provider = provider;
    }
  }

  /**
   * Sets the email provider instance to use.
   * @param provider - An initialized IEmailProvider instance
   * @returns this - for method chaining
   */
  setProvider(provider: IEmailProvider): this {
    this.provider = provider;
    return this;
  }

  /**
   * Gets the current provider instance.
   * @returns The current provider or null if not set
   */
  getProvider(): IEmailProvider | null {
    return this.provider;
  }

  /**
   * Sends an email using the configured provider.
   * @param payload - The email payload (receiver, subject, htmlContent, attachments)
   * @returns Promise with the send result
   * @throws Error if no provider has been set
   */
  async send(payload: EmailPayload): Promise<EmailSendResult> {
    if (!this.provider) {
      throw new Error("No email provider configured. Call setProvider() first.");
    }
    return this.provider.send(payload);
  }
}
