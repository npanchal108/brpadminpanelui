import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserconfiglistComponent } from './userconfiglist.component';

describe('UserconfiglistComponent', () => {
  let component: UserconfiglistComponent;
  let fixture: ComponentFixture<UserconfiglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserconfiglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserconfiglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
