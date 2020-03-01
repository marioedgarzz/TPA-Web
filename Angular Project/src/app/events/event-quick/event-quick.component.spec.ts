import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventQuickComponent } from './event-quick.component';

describe('EventQuickComponent', () => {
  let component: EventQuickComponent;
  let fixture: ComponentFixture<EventQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventQuickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
