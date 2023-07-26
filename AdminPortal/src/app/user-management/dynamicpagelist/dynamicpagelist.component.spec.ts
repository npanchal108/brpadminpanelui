import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dynamicpagelistComponent } from './dynamicpagelist.component';

describe('dynamicpagelistComponent', () => {
  let component: dynamicpagelistComponent;
  let fixture: ComponentFixture<dynamicpagelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ dynamicpagelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dynamicpagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
