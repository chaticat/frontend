import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChatNavigationService } from '../common/service/chat-navigation.service';
import { Chat } from '../common/model/chat';
import { ChatService } from '../service/chat-service.';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateChatModalComponent } from './modal/create-chat-modal/create-chat-modal.component';
import { EmptyChatRequest } from './model/empty-chat-request';
import { UserService } from '../service/user-service.';
import { AuthService } from '../auth/auth.service';
import { UserSearchResponse } from '../common/model/user-search-response';
import { ChatSearchResponse } from '../common/model/chat-search-response';
import { JoinChatModalComponent } from './modal/join-chat-modal/join-chat-modal.component';
import { SideNavResizeService } from '../service/side-nav-resize.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {

  @ViewChild('globalSearchInput') globalSearchInput;

  userChats: Chat[] = [];
  lastInteractionChatId: string;
  isSearchEnabled: boolean
  userSearchResponses: UserSearchResponse[] = [];
  chatSearchResponses: ChatSearchResponse[] = [];
  isShrunk = false;
  isGlobalSearch = false;

  constructor(private chatNavigationService: ChatNavigationService,
              private chatService: ChatService,
              private userService: UserService,
              private authService: AuthService,
              private sideNavResizeService: SideNavResizeService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.chatService.getAllChatsForUser().subscribe(chats => {
      if (chats.length === 0) {

      } else {
        this.userChats = chats;
        this.lastInteractionChatId = chats[0].id;

        const isMobileSize = window.innerWidth < 700 && window.innerHeight < 900;
        if (!isMobileSize || (isMobileSize && !this.sideNavResizeService.isNavOpen())) {
          this.openChat(this.userChats[0])
        }
      }
    });
  }

  openChat(chat: Chat) {
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
        this.createChatWithUser(data.contactId);
      }
    );
  }

  private createChatWithUser(userId) {
    this.chatService.createChatWithUser(userId)
      .subscribe(chat => {
        this.userChats.unshift(chat)
        this.clearSearch();
      });
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
      .subscribe(chat => {
        this.userChats.unshift(chat)
        this.clearSearch();
      });
  }

  logout() {
    this.authService.logout()
  }

  applyGlobalSearch(searchText) {
    this.search(searchText);
    this.globalSearchInput.nativeElement.focus();
  }

  searchEvent($event: any) {
    let searchText = $event.target.value;
    this.search(searchText);
  }

  private search(searchText) {
    if (searchText === '' || searchText === undefined) {
      this.isSearchEnabled = false;
      this.userSearchResponses = [];
    } else {
      this.isSearchEnabled = true;

      this.chatService.searchChats(searchText, this.isGlobalSearch)
        .subscribe(response => {
          this.chatSearchResponses = response;
        });

      this.userService.searchUsers(searchText, this.isGlobalSearch)
        .subscribe(response => {
          this.userSearchResponses = response;
        });
    }
  }

  joinGlobalChat(chatSearchResponse: ChatSearchResponse) {
    if (this.isGlobalSearch) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        isChat: true,
        chatSearchResponse: chatSearchResponse
      }

      let dialogRef = this.dialog.open(JoinChatModalComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        isOpenNewChat => {
          if (isOpenNewChat) {
            this.chatService.getChatById(chatSearchResponse.id).subscribe(chat => {
              this.addChatIntoUserChats(chat);
              this.clearSearch();
            })
          }
        }
      );
    } else {
      this.chatService.getChatById(chatSearchResponse.id).subscribe(chat => {
        this.addChatIntoUserChats(chat);
        this.clearSearch();
      })
    }
  }

  createGlobalChat(userSearchResponse: UserSearchResponse) {
    if (this.isGlobalSearch) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        isChat: false,
        userSearchResponse: userSearchResponse
      }

      let dialogRef = this.dialog.open(JoinChatModalComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        isOpenNewChat => {
          if (isOpenNewChat) {
            this.createChatWithUser(userSearchResponse.id);
            this.lastInteractionChatId = this.userChats[0].id;
            this.openChat(this.userChats[0]);
            this.clearSearch();
          }
        });
    } else {
      this.createChatWithUser(userSearchResponse.id);
      this.lastInteractionChatId = this.userChats[0].id;
      this.openChat(this.userChats[0]);
      this.clearSearch();
    }
  }

  private addChatIntoUserChats(chat: Chat) {
    this.userChats.unshift(chat);
    this.lastInteractionChatId = this.userChats[0].id;
    this.openChat(this.userChats[0]);
  }

  clearSearch() {
    this.isSearchEnabled = false;
    this.unShrinkSearchInput()
    this.globalSearchInput.nativeElement.value = '';
  }

  shrinkSearchInput() {
    this.isShrunk = true;
  }

  unShrinkSearchInput() {
    this.isShrunk = false;
  }
}
