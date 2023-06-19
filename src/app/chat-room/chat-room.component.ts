import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '../service/rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { MessageStatus } from '../common/model/message-status';
import { ChatMessage, Sender } from '../common/model/chat-message';
import { MessageRequest } from './model/message-request';
import { ChatNavigationService } from '../common/service/chat-navigation.service';
import { Chat } from '../common/model/chat';
import { SideNavResizeService } from '../service/side-nav-resize.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  currentChatId: string;
  currentChat: Chat;
  receivedMessages: ChatMessage[] = [];
  private cachedMessagesForChat: ChatMessage[] = [];
  private topicSubscription: Subscription;
  messageInputValue: string;
  currentUserId: string
  isMobileSize = false;

  constructor(private rxStompService: RxStompService,
              private chatNavigationService: ChatNavigationService,
              private sideNavResizeService: SideNavResizeService) {
    this.messageInputValue = '';
    this.currentUserId = '1';

    this.chatNavigationService.chatSource$.subscribe(chat => {
      this.sideNavResizeService.setShowNav(false);
      this.currentChatId = chat.id;
      this.currentChat = chat;
      this.topicSubscription.unsubscribe();
      this.initChatSubscription();
    })
  }

  ngOnInit() {
    this.isMobileSize = window.innerWidth < 700 && window.innerHeight < 900;
    this.initChatSubscription();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobileSize = window.innerWidth < 700 && window.innerHeight < 900;
  }

  private initChatSubscription() {
    this.receivedMessages = [];
    this.cachedMessagesForChat = JSON.parse(localStorage.getItem(this.currentChatId));
    if (this.cachedMessagesForChat === null) {
      this.cachedMessagesForChat = [] as ChatMessage[];
    } else {
      this.cachedMessagesForChat.forEach(val => this.receivedMessages.push(Object.assign({}, val)));
    }

    this.topicSubscription = this.rxStompService
      .watch('/topic/chat/' + this.currentChatId)
      .subscribe((message: Message) => {
        const chatMessage: ChatMessage = JSON.parse(message.body);

        if (chatMessage.from.userId !== this.currentUserId) {
          this.putMessageToLocalStorage(chatMessage);
        }

        this.receivedMessages.push(chatMessage);
      });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
    if (this.messageInputValue !== '') {
      const messageRequest = this.buildMessageRequest();
      this.putMessageToLocalStorage(messageRequest.message)

      this.messageInputValue = '';

      this.rxStompService.publish({
        destination: '/app/chat',
        headers: {Authorization: '2', RefreshToken: '9'},
        body: JSON.stringify(messageRequest)
      });
    }
  }

  private buildMessageRequest() {
    const sender = {} as Sender;
    sender.userId = this.currentUserId;
    sender.name = 'Vitalii';

    const message = {} as ChatMessage;
    message.chatId = this.currentChatId;
    message.from = sender;
    message.content = this.messageInputValue;
    message.status = MessageStatus.PENDING;

    const messageRequest = {} as MessageRequest;
    messageRequest.message = message;

    return messageRequest;
  }

  private putMessageToLocalStorage(chatMessage: ChatMessage) {
    if (chatMessage.content !== '') {
      this.cachedMessagesForChat.push(chatMessage);
      localStorage.removeItem(this.currentChatId);
      localStorage.setItem(this.currentChatId, JSON.stringify(this.cachedMessagesForChat));
    }
  }

  onKeydown($event: any) {
    $event.preventDefault();
  }

  backToSideNav() {
    this.sideNavResizeService.setShowNav(true);
  }
}
