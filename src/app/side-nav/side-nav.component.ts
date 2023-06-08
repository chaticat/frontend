import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatNavigationService } from '../common/service/chat-navigation.service';
import { Chat } from '../common/model/chat';
import { ChatService } from '../service/chat-service.';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateChatModalComponent } from './modal/create-chat-modal/create-chat-modal.component';
import { EmptyChatRequest } from './model/empty-chat-request';
import { UserService } from '../service/user-service.';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../service/search-service.';
import { UserSearchResponse } from '../common/model/user-search-response';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {

  userChats: Chat[] = [];
  lastInteractionChatId: string;
  searchText: string;
  isSearchEnabled: boolean
  userSearchResponses: UserSearchResponse[] = [];
  isShrunk = false;
  isGlobalSearch = false;

  constructor(private chatNavigationService: ChatNavigationService,
              private chatService: ChatService,
              private userService: UserService,
              private authService: AuthService,
              private searchService: SearchService,
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
  }

  openNewChat(chat: Chat) {
    this.lastInteractionChatId = chat.id;
    this.chatNavigationService.openChat(chat);
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

  logout() {
    this.authService.logout()
  }

  search($event: any) {
    if ($event.target.value === '') {
      this.isSearchEnabled = false;
      this.userSearchResponses = [];
    } else {
      this.isSearchEnabled = true;
      this.searchService.searchUsers($event.target.value)
        .subscribe(response => {
          this.userSearchResponses = response;
        });
    }
  }

  shrinkSearchInput() {
    this.isShrunk = true;
  }

  unShrinkSearchInput() {
    this.isShrunk = false;
  }

}
