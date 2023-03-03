import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { rxStompServiceFactory } from './service/rx-stomp-service-factory';
import { RxStompService } from './service/rx-stomp.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
import { NgxEditorModule } from 'ngx-editor';
import { MatInputModule } from '@angular/material/input';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    SideNavComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    NgxEditorModule,
    MatInputModule
  ],
  providers: [
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
