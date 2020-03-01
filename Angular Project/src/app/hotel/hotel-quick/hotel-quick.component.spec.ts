import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelQuickComponent } from './hotel-quick.component';

describe('HotelQuickComponent', () => {
  let component: HotelQuickComponent;
  let fixture: ComponentFixture<HotelQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelQuickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
