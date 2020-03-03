import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBlogDeleteComponent } from './manage-blog-delete.component';

describe('ManageBlogDeleteComponent', () => {
  let component: ManageBlogDeleteComponent;
  let fixture: ComponentFixture<ManageBlogDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBlogDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBlogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
