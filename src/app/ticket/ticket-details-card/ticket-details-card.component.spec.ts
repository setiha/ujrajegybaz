import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsCardComponent } from './ticket-details-card.component';

describe('TicketDetailsCardComponent', () => {
  let component: TicketDetailsCardComponent;
  let fixture: ComponentFixture<TicketDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
