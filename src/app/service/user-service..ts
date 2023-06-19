import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../common/model/user';
import { UserSearchResponse } from '../common/model/user-search-response';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  getAllContactsForUser(): Observable<User[]> {
    return this.http.get<User[]>(environment.API_URL + '/users/contacts');
  }

  searchUsers(searchText: string, globalSearch: boolean): Observable<UserSearchResponse[]> {
    return this.http.get<UserSearchResponse[]>(environment.API_URL + '/users/search/username?searchText=' + searchText + "&global=" + globalSearch);
  }

}
