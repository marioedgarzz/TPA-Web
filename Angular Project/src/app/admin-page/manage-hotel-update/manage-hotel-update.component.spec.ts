import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHotelUpdateComponent } from './manage-hotel-update.component';

describe('ManageHotelUpdateComponent', () => {
  let component: ManageHotelUpdateComponent;
  let fixture: ComponentFixture<ManageHotelUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHotelUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHotelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
