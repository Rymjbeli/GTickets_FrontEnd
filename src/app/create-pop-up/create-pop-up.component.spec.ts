import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePopUpComponent } from './create-pop-up.component';

describe('CreatePopUpComponent', () => {
  let component: CreatePopUpComponent;
  let fixture: ComponentFixture<CreatePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePopUpComponent]
    });
    fixture = TestBed.createComponent(CreatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
