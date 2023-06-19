import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from 'src/environments/environment';
import {Token} from "./model/token.model";
import {Registration} from "./model/registration.model";
import {HttpClient} from "@angular/common/http";
import {Login} from "./model/login.model";
import { ApiResponse } from '../common/model/api-response.model';
import { RefreshToken } from './model/refresh-token.model';

@Injectable({providedIn: 'root'})
export class AuthService {

  private options = {headers: {'Content-Type': 'application/json'}};
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
              public jwtHelper: JwtHelperService,
              private http: HttpClient) {
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');

    if (token) {
      this.loggedIn.next(!this.jwtHelper.isTokenExpired(token));
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      this.loggedIn.next(false);
      return false;
    }
  }

  registration(registrationObject: Registration): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.API_URL + '/auth/sign-up', registrationObject, this.options);
  }

  login(loginObject: Login): Observable<Token> {
    return this.http.post<Token>(environment.API_URL + '/auth/sign-in', loginObject, this.options);
  }
  doesUsernameExists(username: string): Observable<boolean> {
    let options = {
      headers: {'Content-Type': 'application/json'},
      params: {username: username}
    };
    return this.http.get<boolean>(environment.API_URL + '/auth/username-exists', options);
  }

  refreshToken(refreshToken: RefreshToken): Observable<Token> {
    return this.http.post<Token>(environment.API_URL + '/auth/refresh-token', refreshToken, this.options);
  }

  refreshTokenForUser() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (this.jwtHelper.isTokenExpired(refreshToken)) {
      this.logout();
    } else {
      const token = {} as RefreshToken;
      token.refreshToken = refreshToken;
      this.refreshToken(token).subscribe(
        next => {
          this.setUserTokens(next.accessToken, next.refreshToken, String(next.userId));
        }
      )
    }
  }

  setUserTokens(accessToken: string, refreshToken: string, userId: string): void {
    localStorage.setItem(`accessToken`, accessToken);
    localStorage.setItem(`refreshToken`, refreshToken);
    localStorage.setItem(`userId`, userId);
  }

  logout(): void {
    this.removeAuthorization();
    this.router.navigate(['/auth']);
  }

  removeAuthorization(): void {
    localStorage.removeItem(`accessToken`);
    localStorage.removeItem(`refreshToken`);
    localStorage.removeItem(`userId`);
    localStorage.removeItem(`projectId`);
    localStorage.removeItem(`isUserNotNew`);
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  getUserTokens(): Token {
    return {
      accessToken: localStorage.getItem(`accessToken`),
      refreshToken: localStorage.getItem(`refreshToken`),
      userId: localStorage.getItem(`userId`)
    }
  }

}
