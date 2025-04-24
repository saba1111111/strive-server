export interface IMessageSenderProvider {
  sendMessage(to: string, topic: string, message: string): Promise<boolean>;
}
