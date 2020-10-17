import { TestBed } from '@angular/core/testing';

import { MockedChatService } from './mocked-chat.service';

describe('MockedChatService', () => {
  let service: MockedChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockedChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
