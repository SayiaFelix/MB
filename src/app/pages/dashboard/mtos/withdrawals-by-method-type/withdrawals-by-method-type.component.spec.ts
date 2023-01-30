import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalsByMethodTypeComponent } from './withdrawals-by-method-type.component';

describe('WithdrawalsByMethodTypeComponent', () => {
  let component: WithdrawalsByMethodTypeComponent;
  let fixture: ComponentFixture<WithdrawalsByMethodTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalsByMethodTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalsByMethodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
