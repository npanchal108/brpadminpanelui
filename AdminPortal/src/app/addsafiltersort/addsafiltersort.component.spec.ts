import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { addsafiltersortComponent } from './addsafiltersort.component';

describe('addsafiltersortComponent', () => {
  let component: addsafiltersortComponent;
  let fixture: ComponentFixture<addsafiltersortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ addsafiltersortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(addsafiltersortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
