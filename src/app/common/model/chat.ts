import { ChatMessage } from './chat-message';
import { User } from './user';

export interface Chat {
  id: string
  name: string,
  iconUrl: string,
  lastMessage: ChatMessage;
  participants: User[]
  isGroup: boolean
}
