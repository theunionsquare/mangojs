import { injectable } from "inversify";
import { IEmailService } from "./IEmailService";

/**
 * Legacy dummy email service for testing.
 *
 * @deprecated Use DummyProvider with EmailServiceFactory instead.
 */
@injectable()
export class EmailServiceDummy implements IEmailService {
  provider: string;
  // constructor and other methods can be added here
  public constructor() {
    this.provider = "Dummy";
  }
  async sendTransactionEmail(
    receiver: string,
    subject: string,
    templatePath: string,
    attachments?: Array<{ name: string; content: string }>
  ): Promise<{}> {
    // Implementation for sending transactional email using Brevo
    console.log(`Sending transactional email using template: ${templatePath}`);
    // TO DO: Integrate with Brevo API to send the email
    // read template html from path

    // send email logic here
    console.log(`Email sent`);
    return {};
  }
}
