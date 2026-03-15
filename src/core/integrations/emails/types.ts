/**
 * Email integration types.
 */

/**
 * Email payload for sending transactional emails.
 */
export interface EmailPayload {
  receiver: string;
  subject: string;
  htmlContent: string;
  attachments?: Array<{ name: string; content: string }>;
}

/**
 * Result of sending an email.
 */
export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  raw?: unknown;
}

/**
 * Base interface that all email providers must implement.
 */
export interface IEmailProvider {
  readonly providerName: string;
  send(payload: EmailPayload): Promise<EmailSendResult>;
}

/**
 * Brevo provider configuration.
 */
export interface BrevoProviderConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
}

/**
 * Resend provider configuration.
 */
export interface ResendProviderConfig {
  apiKey: string;
  fromEmail: string;
  fromName?: string;
}

/**
 * Dummy provider configuration for testing.
 */
export interface DummyProviderConfig {
  logToConsole?: boolean;
}
