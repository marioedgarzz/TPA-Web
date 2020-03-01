import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentalQuickComponent } from './car-rental-quick.component';

describe('CarRentalQuickComponent', () => {
  let component: CarRentalQuickComponent;
  let fixture: ComponentFixture<CarRentalQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRentalQuickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRentalQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
