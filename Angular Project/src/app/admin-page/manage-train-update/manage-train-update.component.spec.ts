import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainUpdateComponent } from './manage-train-update.component';

describe('ManageTrainUpdateComponent', () => {
  let component: ManageTrainUpdateComponent;
  let fixture: ComponentFixture<ManageTrainUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTrainUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTrainUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
