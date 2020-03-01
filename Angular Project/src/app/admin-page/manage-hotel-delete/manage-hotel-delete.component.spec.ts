import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHotelDeleteComponent } from './manage-hotel-delete.component';

describe('ManageHotelDeleteComponent', () => {
  let component: ManageHotelDeleteComponent;
  let fixture: ComponentFixture<ManageHotelDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHotelDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHotelDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
