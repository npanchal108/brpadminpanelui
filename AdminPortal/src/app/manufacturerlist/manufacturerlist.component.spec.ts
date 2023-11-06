import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerlistComponent } from './manufacturerlist.component';

describe('ManufacturerlistComponent', () => {
  let component: ManufacturerlistComponent;
  let fixture: ComponentFixture<ManufacturerlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManufacturerlistComponent]
    });
    fixture = TestBed.createComponent(ManufacturerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
