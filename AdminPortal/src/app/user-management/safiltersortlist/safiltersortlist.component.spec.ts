import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { safiltersortlistComponent } from './safiltersortlist.component';

describe('UserconfiglistComponent', () => {
  let component: safiltersortlistComponent;
  let fixture: ComponentFixture<safiltersortlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ safiltersortlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(safiltersortlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
