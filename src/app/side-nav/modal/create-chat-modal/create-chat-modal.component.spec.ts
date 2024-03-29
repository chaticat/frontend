import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChatModalComponent } from './create-chat-modal.component';

describe('CreateChatModalComponent', () => {
  let component: CreateChatModalComponent;
  let fixture: ComponentFixture<CreateChatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChatModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
