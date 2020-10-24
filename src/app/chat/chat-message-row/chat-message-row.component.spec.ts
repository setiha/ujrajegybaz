import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageRowComponent } from './chat-message-row.component';

describe('ChatMessageRowComponent', () => {
  let component: ChatMessageRowComponent;
  let fixture: ComponentFixture<ChatMessageRowComponent>;

  beforeEach(async(() => {
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
