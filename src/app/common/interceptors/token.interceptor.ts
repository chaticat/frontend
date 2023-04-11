import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../../auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('auth')) {
      const {accessToken, refreshToken} = this.auth.getUserTokens();

      request = request.clone({
        setHeaders: {
          'Authorization': accessToken,
          'RefreshToken': refreshToken
        }
      });
    }

    return next.handle(request);
  }
}
