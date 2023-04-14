import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserSearchResponse } from '../common/model/user-search-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  searchUsers(searchText: string): Observable<UserSearchResponse[]> {
    return this.http.get<UserSearchResponse[]>(environment.API_URL + '/users/search/username?searchText=' + searchText);
  }

}
