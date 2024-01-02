import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeomanagementComponent } from './seomanagement.component';

describe('SeomanagementComponent', () => {
  let component: SeomanagementComponent;
  let fixture: ComponentFixture<SeomanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeomanagementComponent]
    });
    fixture = TestBed.createComponent(SeomanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
