import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailtemplatelistComponent } from './mailtemplatelist.component';

describe('MailtemplatelistComponent', () => {
  let component: MailtemplatelistComponent;
  let fixture: ComponentFixture<MailtemplatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailtemplatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailtemplatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
