import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinChatModalComponent } from './join-chat-modal.component';

describe('JoinChatModalComponent', () => {
  let component: JoinChatModalComponent;
  let fixture: ComponentFixture<JoinChatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinChatModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinChatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
