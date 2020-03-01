import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentalHeaderComponent } from './car-rental-header.component';

describe('CarRentalHeaderComponent', () => {
  let component: CarRentalHeaderComponent;
  let fixture: ComponentFixture<CarRentalHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRentalHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRentalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
