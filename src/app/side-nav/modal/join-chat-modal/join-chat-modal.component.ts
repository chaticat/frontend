import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatSearchResponse } from '../../../common/model/chat-search-response';
import { UserSearchResponse } from '../../../common/model/user-search-response';

@Component({
  selector: 'app-join-chat-modal',
  templateUrl: './join-chat-modal.component.html',
  styleUrls: ['./join-chat-modal.component.scss']
})
export class JoinChatModalComponent implements OnInit {

  isChat: boolean = true;
  chatSearchResponse: ChatSearchResponse;
  userSearchResponse: UserSearchResponse;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<JoinChatModalComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.isChat = data.isChat;
    this.chatSearchResponse = data.chatSearchResponse;
    this.userSearchResponse= data.userSearchResponse;
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
