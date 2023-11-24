import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercartreportComponent } from './usercartreport.component';

describe('UsercartreportComponent', () => {
  let component: UsercartreportComponent;
  let fixture: ComponentFixture<UsercartreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsercartreportComponent]
    });
    fixture = TestBed.createComponent(UsercartreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
