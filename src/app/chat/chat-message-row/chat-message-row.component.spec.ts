import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChatMessageRowComponent } from './chat-message-row.component';

describe('ChatMessageRowComponent', () => {
  let component: ChatMessageRowComponent;
  let fixture: ComponentFixture<ChatMessageRowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
