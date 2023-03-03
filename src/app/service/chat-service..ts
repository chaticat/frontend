import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../common/model/chat';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  getAllChatsForUser(): Observable<Chat[]> {
    return this.http.get<Chat[]>(environment.API_URL + '/chat');
  }

  createChatWithUser(userId: string): Observable<Chat> {
    return this.http.post<Chat>(environment.API_URL + '/chat/' + userId, null);
  }

}
