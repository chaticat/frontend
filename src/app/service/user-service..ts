import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../common/model/user';

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

}
