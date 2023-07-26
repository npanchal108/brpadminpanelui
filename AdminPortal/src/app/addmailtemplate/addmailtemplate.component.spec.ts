import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmailtemplateComponent } from './addmailtemplate.component';

describe('AddmailtemplateComponent', () => {
  let component: AddmailtemplateComponent;
  let fixture: ComponentFixture<AddmailtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmailtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmailtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
