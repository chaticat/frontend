import { MessageStatus } from './message-status';

export interface ChatMessage {
  chatId: string
  from: Sender
  content: string
  timestamp: Date
  status: MessageStatus
}

export interface Sender {
  userId: string
  name: string
}
