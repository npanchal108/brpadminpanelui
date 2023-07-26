import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderlinksComponent } from './headerlinks.component';

describe('HeaderlinksComponent', () => {
  let component: HeaderlinksComponent;
  let fixture: ComponentFixture<HeaderlinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderlinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
