import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBannersComponent } from './Add-Banners.component';

describe('AddBannersComponent', () => {
  let component: AddBannersComponent;
  let fixture: ComponentFixture<AddBannersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBannersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
