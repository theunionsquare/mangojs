import {
  IEmailProvider,
  EmailPayload,
  EmailSendResult,
  BrevoProviderConfig,
} from "../IEmailProvider";

export class BrevoProvider implements IEmailProvider {
  readonly providerName = "brevo";
  private readonly apiKey: string;
  private readonly senderEmail: string;
  private readonly senderName: string;
  private readonly apiUrl = "https://api.brevo.com/v3/smtp/email";

  constructor(config: BrevoProviderConfig) {
    this.apiKey = config.apiKey;
    this.senderEmail = config.senderEmail;
    this.senderName = config.senderName;
  }

  async send(payload: EmailPayload): Promise<EmailSendResult> {
    const body = JSON.stringify({
      sender: { name: this.senderName, email: this.senderEmail },
      to: [{ email: payload.receiver }],
      subject: payload.subject,
      htmlContent: payload.htmlContent,
      attachment: payload.attachments?.map((a) => ({
        name: a.name,
        content: a.content,
      })),
    });

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": this.apiKey,
        },
        body,
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: responseData.message || `HTTP ${response.status}`,
          raw: responseData,
        };
      }

      return {
        success: true,
        messageId: responseData.messageId,
        raw: responseData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
