export class LlmResponse {
  id: number;
  adminId: number;
  prompt: string;
  response: string;
  model: string;
  createdAt: Date;
}

export class LlmResponseWithAdminInfo extends LlmResponse {
  adminEmail: string;
}
