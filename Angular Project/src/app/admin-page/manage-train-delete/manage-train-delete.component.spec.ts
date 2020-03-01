import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainDeleteComponent } from './manage-train-delete.component';

describe('ManageTrainDeleteComponent', () => {
  let component: ManageTrainDeleteComponent;
  let fixture: ComponentFixture<ManageTrainDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTrainDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTrainDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
