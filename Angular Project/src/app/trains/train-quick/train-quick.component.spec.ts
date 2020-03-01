import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainQuickComponent } from './train-quick.component';

describe('TrainQuickComponent', () => {
  let component: TrainQuickComponent;
  let fixture: ComponentFixture<TrainQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainQuickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
