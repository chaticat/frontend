import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../common/model/user';

@Component({
  selector: 'app-create-chat-modal',
  templateUrl: './create-chat-modal.component.html',
  styleUrls: ['./create-chat-modal.component.scss']
})
export class CreateChatModalComponent implements OnInit {

  isGroup: boolean = true;
  form: FormGroup;
  groupName: string;
  contactId: string;
  contacts: Observable<User[]>;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateChatModalComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.isGroup = data.isGroup;
    this.contacts = data.contacts;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.groupName, []],
      contactId: [this.contactId, []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
