import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCacherComponent } from './delete-cacher.component';

describe('DeleteCacherComponent', () => {
  let component: DeleteCacherComponent;
  let fixture: ComponentFixture<DeleteCacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
