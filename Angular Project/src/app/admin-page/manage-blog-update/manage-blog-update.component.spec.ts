import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBlogUpdateComponent } from './manage-blog-update.component';

describe('ManageBlogUpdateComponent', () => {
  let component: ManageBlogUpdateComponent;
  let fixture: ComponentFixture<ManageBlogUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBlogUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBlogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
