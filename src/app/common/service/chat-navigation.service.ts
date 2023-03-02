import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Chat } from '../model/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatNavigationService implements OnInit {

  private chatSource = new Subject<Chat>();

  chatSource$ = this.chatSource.asObservable();

  ngOnInit(): void {
  }

  openChat(chat: Chat) {
    this.chatSource.next(chat);
  }

}
