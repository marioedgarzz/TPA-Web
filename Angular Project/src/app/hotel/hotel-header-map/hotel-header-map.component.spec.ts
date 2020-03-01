import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelHeaderMapComponent } from './hotel-header-map.component';

describe('HotelHeaderMapComponent', () => {
  let component: HotelHeaderMapComponent;
  let fixture: ComponentFixture<HotelHeaderMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelHeaderMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelHeaderMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
