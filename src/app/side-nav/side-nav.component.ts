import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatNavigationService } from '../common/service/chat-navigation.service';
import { Chat } from '../common/model/chat';
import { ChatMessage } from '../common/model/chat-message';
import { MessageStatus } from '../common/model/message-status';
import { ChatService } from '../service/chat-service.';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateChatModalComponent } from './modal/create-chat-modal/create-chat-modal.component';
import { EmptyChatRequest } from './model/empty-chat-request';
import { UserService } from '../service/user-service.';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {

  userChats: Chat[] = [];
  lastInteractionChatId: string;

  constructor(private chatNavigationService: ChatNavigationService,
              private chatService: ChatService,
              private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.chatService.getAllChatsForUser().subscribe(chats => {

      if (chats.length === 0) {

      } else {
        this.userChats = chats;
        this.lastInteractionChatId = chats[0].id;
        this.openNewChat(this.userChats[0])
      }
    });

    //this.initDummyData();
    //this.lastInteractionChatId = this.userChats[0].id;
  }

  openNewChat(chat: Chat) {
    this.lastInteractionChatId = chat.id;
    this.chatNavigationService.openChat(chat);
  }

  private initDummyData() {
    let chat1 = {} as Chat;
    chat1.id = '100';
    chat1.name = 'Saved messages'

    let chat1LastMessage = {} as ChatMessage;
    chat1LastMessage.content = 'hello world'
    chat1LastMessage.status = MessageStatus.DELIVERED

    chat1.lastMessage = chat1LastMessage;

    this.userChats.push(chat1);

    let chat2 = {} as Chat;
    chat2.id = '101';
    chat2.name = 'Vitalii Stefanchak'

    let chat2LastMessage = {} as ChatMessage;
    chat2LastMessage.content = 'Дивовижно'
    chat2LastMessage.status = MessageStatus.PENDING

    chat2.lastMessage = chat2LastMessage;

    this.userChats.push(chat2);
  }

  openCreateNewChatModal() {
    let contactsForUser = this.userService.getAllContactsForUser();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      isGroup: false,
      contacts: contactsForUser
    }

    let dialogRef = this.dialog.open(CreateChatModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.createChat(data);
      }
    );
  }

  private createChat(data) {
    this.chatService.createChatWithUser(data.contactId)
      .subscribe(chat => this.userChats.unshift(chat));
  }

  openCreateNewGroupModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      isGroup: true,
    }

    let dialogRef = this.dialog.open(CreateChatModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.createEmptyChat(data);
      }
    );
  }

  private createEmptyChat(data) {
    const emptyChatRequest = {} as EmptyChatRequest;
    emptyChatRequest.name = data.name;

    this.chatService.createEmptyChat(emptyChatRequest)
      .subscribe(chat => this.userChats.unshift(chat));
  }
}
