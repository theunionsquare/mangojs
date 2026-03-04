/**
 * Email payload for sending transactional emails
 */
export interface EmailPayload {
  receiver: string;
  subject: string;
  htmlContent: string;
  attachments?: Array<{ name: string; content: string }>;
}

/**
 * Base interface that all email providers must implement
 */
export interface IEmailProvider {
  readonly providerName: string;
  send(payload: EmailPayload): Promise<EmailSendResult>;
}

/**
 * Result of sending an email
 */
export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  raw?: unknown;
}

/**
 * Provider configuration types
 */
export interface BrevoProviderConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
}

export interface ResendProviderConfig {
  apiKey: string;
  fromEmail: string;
  fromName?: string;
}

export interface DummyProviderConfig {
  logToConsole?: boolean;
}

