export interface IMessageSenderProvider {
  sendMessage(to: string, topic: string, message: string, imageUrl?: string): Promise<boolean>;
}
