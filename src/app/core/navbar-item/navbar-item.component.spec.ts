import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavbarItemComponent } from './navbar-item.component';

describe('NavbarItemComponent', () => {
  let component: NavbarItemComponent;
  let fixture: ComponentFixture<NavbarItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
