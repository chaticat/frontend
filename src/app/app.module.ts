import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { rxStompServiceFactory } from './service/rx-stomp-service-factory';
import { RxStompService } from './service/rx-stomp.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
import { NgxEditorModule } from 'ngx-editor';
import { MatInputModule } from '@angular/material/input';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CreateChatModalComponent } from './side-nav/modal/create-chat-modal/create-chat-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { NotifierComponent } from './common/notifier/notifier.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptor } from './common/interceptors/token.interceptor';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    SideNavComponent,
    MainComponent,
    CreateChatModalComponent,
    NotifierComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    NgxEditorModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [
    AuthGuard,
    {
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS
    },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: false
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
