import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '../service/rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { MessageRequest } from './dto/message-request';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  receivedMessages: string[] = [];
  // @ts-ignore
  private topicSubscription: Subscription;
  messageInputValue: string;

  constructor(private rxStompService: RxStompService) {
    this.messageInputValue = "";
  }

  ngOnInit() {
    this.topicSubscription = this.rxStompService
      .watch('/topic/chat')
      .subscribe((message: Message) => {
        this.receivedMessages.push(message.body);
      });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
    const message = {} as MessageRequest;
    message.message = this.messageInputValue;

    this.rxStompService.publish({destination: '/app/chat', body: JSON.stringify(message)});
  }
}
