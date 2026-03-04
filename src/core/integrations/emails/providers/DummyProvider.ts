import {
  IEmailProvider,
  EmailPayload,
  EmailSendResult,
  DummyProviderConfig,
} from "../IEmailProvider";

export class DummyProvider implements IEmailProvider {
  readonly providerName = "dummy";
  private readonly logToConsole: boolean;

  constructor(config?: DummyProviderConfig) {
    this.logToConsole = config?.logToConsole ?? true;
  }

  async send(payload: EmailPayload): Promise<EmailSendResult> {
    if (this.logToConsole) {
      console.log("[DummyProvider] Email send simulated:", {
        to: payload.receiver,
        subject: payload.subject,
        htmlLength: payload.htmlContent.length,
        attachments: payload.attachments?.length ?? 0,
      });
    }

    return {
      success: true,
      messageId: `dummy-${Date.now()}`,
    };
  }
}
