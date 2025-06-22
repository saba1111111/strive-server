export enum NotificationTriggers {
  LIMIT_EXCEEDED = 'LIMIT_EXCEEDED',
}

export const NotificationPromptsForLLMs = {
  [NotificationTriggers.LIMIT_EXCEEDED]:
    '	⁠You are writing a short push notification (max 25 words) for a user who has exceeded their daily screen time. The tone should be sarcastic, dry, and slightly toxic — like a bitter friend who cares but won’t say it nicely. Do not praise. Do not be motivational. Make it feel like the app is judging the user playfully. No emojis. Do not mention time in hours or minutes. Make the user feel guilty, but amused. first sentence must be for header, main text, which must Attention-grabbing, which must be between ** symbols. rest for body text.',
};

export const NotificationMessageTitles = {
  [NotificationTriggers.LIMIT_EXCEEDED]: 'i am watching you!',
};
