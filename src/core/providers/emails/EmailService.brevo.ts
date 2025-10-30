import { injectable } from "inversify";
import { IEmailService } from "./IEmailService";

@injectable()
export class EmailServiceBrevo implements IEmailService {
  provider: string;
  brevoApiKey: string;
  senderEmail: string;
  senderName: string;
  url: string;
  // constructor and other methods can be added here
  public constructor(
    senderEmail: string,
    senderName: string,
    brevoApiKey: string
  ) {
    this.provider = "Brevo";
    this.url = "https://api.brevo.com/v3/smtp/email";
    this.brevoApiKey = brevoApiKey;
    this.senderEmail = senderEmail;
    this.senderName = senderName;
  }
  async sendTransactionEmail(
    receiver: string,
    subject: string,
    templateHtml: string,
    attachments?: Array<{ name: string; content: string }>
  ): Promise<{}> {
    // Implementation for sending transactional email using Brevo
    console.log(`Sending transactional with Brevo service`);
    //http call
    const body = JSON.stringify({
      sender: { name: this.senderName, email: this.senderEmail },
      to: [{ email: receiver }],
      subject: subject,
      htmlContent: templateHtml,
    });
    //console.log(`Email sent using Brevo with template: ${body}`);

    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.brevoApiKey,
      },
      body,
    });
    const responseData = await response.json();
    console.log(
      `Response status: ${response.status}`,
      `Response data:`,
      responseData
    );
    return responseData;
  }
}
