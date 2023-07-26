import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColorConfigComponent } from './add-color-config.component';

describe('AddColorConfigComponent', () => {
  let component: AddColorConfigComponent;
  let fixture: ComponentFixture<AddColorConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddColorConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
