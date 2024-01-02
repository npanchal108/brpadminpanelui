import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmetaComponent } from './addmeta.component';

describe('AddmetaComponent', () => {
  let component: AddmetaComponent;
  let fixture: ComponentFixture<AddmetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddmetaComponent]
    });
    fixture = TestBed.createComponent(AddmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
