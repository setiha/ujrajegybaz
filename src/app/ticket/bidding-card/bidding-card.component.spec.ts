import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BiddingCardComponent} from "./bidding-card.component";

describe('BiddingCardComponent', () => {
  let component: BiddingCardComponent;
  let fixture: ComponentFixture<BiddingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BiddingCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
