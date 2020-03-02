import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEventUpdateComponent } from './manage-event-update.component';

describe('ManageEventUpdateComponent', () => {
  let component: ManageEventUpdateComponent;
  let fixture: ComponentFixture<ManageEventUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEventUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEventUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
