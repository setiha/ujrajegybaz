import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageSendFormComponent } from './chat-message-send-form.component';

describe('ChatMessageSendFormComponent', () => {
  let component: ChatMessageSendFormComponent;
  let fixture: ComponentFixture<ChatMessageSendFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageSendFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageSendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
