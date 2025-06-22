import { Inject, Injectable } from '@nestjs/common';
import { handleError } from 'src/common/application/utils';
import { LlmMessageRoles, LlmModels, SharedTokens } from 'src/common/application/enum';
import { ILlmClientProvider, IMessageSenderProvider } from 'src/common/application/interfaces';
import { NotificationMessageTitles, NotificationPromptsForLLMs, NotificationTriggers } from 'src/notifications/domain';

@Injectable()
export class SendNotificationUseCase {
  constructor(
    @Inject(SharedTokens.FIREBASE_NOTIFICATIONS_PROVIDER)
    private readonly firebaseNotificationsProvider: IMessageSenderProvider,
    @Inject(SharedTokens.LLM_CLIENT_OPENAI_PROVIDER)
    private readonly openAIProvider: ILlmClientProvider,
  ) {}

  public async execute(data: { to: string; triggerEvent: NotificationTriggers }): Promise<boolean> {
    try {
      const { message } = await this.openAIProvider.generateResponse({
        model: LlmModels.gpt4Point1nano,
        messages: [{ role: LlmMessageRoles.user, content: NotificationPromptsForLLMs[data.triggerEvent] }],
      });

      const titleMatch = message.match(/\*\*(.+?)\*\*/);
      const title = titleMatch ? titleMatch[1].trim() : NotificationMessageTitles[data.triggerEvent];
      const body = titleMatch ? message.replace(titleMatch[0], '').trim() : message;

      await this.firebaseNotificationsProvider.sendMessage(data.to, title, body);

      return true;
    } catch (error) {
      handleError(error);
    }
  }
}
