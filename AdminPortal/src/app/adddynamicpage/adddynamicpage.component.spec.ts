import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { adddynamicpageComponent } from './adddynamicpage.component';

describe('AddmailtemplateComponent', () => {
  let component: adddynamicpageComponent;
  let fixture: ComponentFixture<adddynamicpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ adddynamicpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(adddynamicpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
