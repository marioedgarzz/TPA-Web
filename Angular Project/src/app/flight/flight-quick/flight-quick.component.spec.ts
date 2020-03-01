import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightQuickComponent } from './flight-quick.component';

describe('FlightQuickComponent', () => {
  let component: FlightQuickComponent;
  let fixture: ComponentFixture<FlightQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightQuickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
