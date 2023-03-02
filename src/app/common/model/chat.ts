import { ChatMessage } from './chat-message';
import { User } from './user';

export interface Chat {
  id: string
  chatName: string,
  iconUrl: string,
  lastMessage: ChatMessage;
  participants: User[]
  lastInteraction: boolean
}
