import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskTableComponent } from './helpdesk-table.component';

describe('HelpdeskTableComponent', () => {
  let component: HelpdeskTableComponent;
  let fixture: ComponentFixture<HelpdeskTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpdeskTableComponent]
    });
    fixture = TestBed.createComponent(HelpdeskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
