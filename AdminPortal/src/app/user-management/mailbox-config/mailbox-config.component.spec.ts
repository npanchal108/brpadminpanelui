import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxConfigComponent } from './mailbox-config.component';

describe('MailboxConfigComponent', () => {
  let component: MailboxConfigComponent;
  let fixture: ComponentFixture<MailboxConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailboxConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
