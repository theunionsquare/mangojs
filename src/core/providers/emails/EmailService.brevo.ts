import { injectable } from "inversify";
import { IEmailService } from "./IEmailService";

@injectable()
export class EmailServiceBrevo implements IEmailService {
  provider: string;
  brevoApiKey: string;
  senderEmail: string;
  senderName: string;
  // constructor and other methods can be added here
  public constructor(
    senderEmail: string,
    senderName: string,
    brevoApiKey: string
  ) {
    this.provider = "Brevo";
    this.brevoApiKey = brevoApiKey;
    this.senderEmail = senderEmail;
    this.senderName = senderName;
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
    const templateHtml = ""; // Placeholder for template content
    // send email logic here
    //http call
    const body = JSON.stringify({
      sender: { name: this.senderName, email: this.senderEmail },
      to: [{ email: receiver }],
      subject: subject,
      htmlContent: templatePath,
    });
    console.log(`Email sent using Brevo with template: ${body}`);

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.brevoApiKey,
      },
      body,
    });
    const responseData = await response.json();
    console.log(`Response status: ${response.status}`);
    console.log(`Response data:`, responseData);
    return responseData;
  }
}
