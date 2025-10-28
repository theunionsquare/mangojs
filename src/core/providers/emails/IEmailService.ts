export interface IEmailService {
  // transaction(process: Function): string;
  sendTransactionEmail(
    receiver: string,
    subject: string,
    templatePath: string,
    attachments?: Array<{ name: string; content: string }>
  ): Promise<{}>;
}
