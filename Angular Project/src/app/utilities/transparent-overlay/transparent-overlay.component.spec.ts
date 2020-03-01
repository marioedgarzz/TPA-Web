import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparentOverlayComponent } from './transparent-overlay.component';

describe('TransparentOverlayComponent', () => {
  let component: TransparentOverlayComponent;
  let fixture: ComponentFixture<TransparentOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransparentOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransparentOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
