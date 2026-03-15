/**
 * @module Email
 * @description Email integration with pluggable providers (Brevo, Resend, Dummy).
 *
 * @example
 * import { EmailServiceFactory, BrevoProvider } from '@anthropic/mangojs';
 *
 * const provider = new BrevoProvider({ apiKey: '...', senderEmail: '...', senderName: '...' });
 * const emailService = new EmailServiceFactory(provider);
 * await emailService.send({ receiver: 'user@example.com', subject: 'Hello', htmlContent: '<p>Hi!</p>' });
 */

// Types
export * from "./types";

// Factory
export { EmailServiceFactory } from "./EmailServiceFactory";

// Providers
export * from "./providers";

// Legacy exports (deprecated)
/** @deprecated Use BrevoProvider with EmailServiceFactory instead */
export { EmailServiceBrevo } from "./EmailService.brevo";
/** @deprecated Use DummyProvider with EmailServiceFactory instead */
export { EmailServiceDummy } from "./EmailService.dummy";
/** @deprecated Use IEmailProvider from ./types instead */
export type { IEmailService } from "./IEmailService";
