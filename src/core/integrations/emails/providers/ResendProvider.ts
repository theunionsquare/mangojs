import {
  IEmailProvider,
  EmailPayload,
  EmailSendResult,
  ResendProviderConfig,
} from "../types";

export class ResendProvider implements IEmailProvider {
  readonly providerName = "resend";
  private readonly apiKey: string;
  private readonly fromEmail: string;
  private readonly fromName?: string;
  private readonly apiUrl = "https://api.resend.com/emails";

  constructor(config: ResendProviderConfig) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
    this.fromName = config.fromName;
  }

  async send(payload: EmailPayload): Promise<EmailSendResult> {
    const from = this.fromName
      ? `${this.fromName} <${this.fromEmail}>`
      : this.fromEmail;

    const body = JSON.stringify({
      from,
      to: [payload.receiver],
      subject: payload.subject,
      html: payload.htmlContent,
      attachments: payload.attachments?.map((a) => ({
        filename: a.name,
        content: a.content,
      })),
    });

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body,
      });

      const responseData = (await response.json()) as {
        message?: string;
        id?: string;
      };

      if (!response.ok) {
        return {
          success: false,
          error: responseData.message || `HTTP ${response.status}`,
          raw: responseData,
        };
      }

      return {
        success: true,
        messageId: responseData.id,
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
