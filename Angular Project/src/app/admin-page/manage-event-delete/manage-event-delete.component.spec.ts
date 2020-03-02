import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEventDeleteComponent } from './manage-event-delete.component';

describe('ManageEventDeleteComponent', () => {
  let component: ManageEventDeleteComponent;
  let fixture: ComponentFixture<ManageEventDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEventDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEventDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
