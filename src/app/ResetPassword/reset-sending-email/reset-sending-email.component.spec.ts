import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSendingEmailComponent } from './reset-sending-email.component';

describe('ResetSendingEmailComponent', () => {
  let component: ResetSendingEmailComponent;
  let fixture: ComponentFixture<ResetSendingEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetSendingEmailComponent]
    });
    fixture = TestBed.createComponent(ResetSendingEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
