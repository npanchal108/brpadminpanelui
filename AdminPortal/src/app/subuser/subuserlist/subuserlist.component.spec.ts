import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubuserlistComponent } from './subuserlist.component';

describe('SubuserlistComponent', () => {
  let component: SubuserlistComponent;
  let fixture: ComponentFixture<SubuserlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubuserlistComponent]
    });
    fixture = TestBed.createComponent(SubuserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
