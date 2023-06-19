import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../common/model/chat';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EmptyChatRequest } from '../side-nav/model/empty-chat-request';
import { ChatSearchResponse } from '../common/model/chat-search-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  getAllChatsForUser(): Observable<Chat[]> {
    return this.http.get<Chat[]>(environment.API_URL + '/chats');
    /*     return new Observable((observer) => {
          const chat = {} as Chat;
          chat.id = "1";
          chat.name = "News";

          observer.next([chat, chat, chat, chat, chat, chat, chat, chat, chat, chat, chat, chat]);
          observer.complete()
        });*/
  }

  getChatById(id: string): Observable<Chat> {
    return this.http.get<Chat>(environment.API_URL + '/chats/' + id);
    /*    return new Observable((observer) => {
          const chat = {} as Chat;
          chat.id = "1";
          chat.name = "News";

          observer.next(chat);
          observer.complete()
        });*/
  }

  createChatWithUser(userId: string): Observable<Chat> {
    return this.http.post<Chat>(environment.API_URL + '/chats/' + userId, null);
  }

  createEmptyChat(request: EmptyChatRequest): Observable<Chat> {
    return this.http.post<Chat>(environment.API_URL + '/chats', request);
  }

  searchChats(searchText: string, globalSearch: boolean): Observable<ChatSearchResponse[]> {
    return this.http.get<ChatSearchResponse[]>(environment.API_URL + '/chats/search/name?searchText=' + searchText + '&global=' + globalSearch);
  }

}
