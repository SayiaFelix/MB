import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueOfTransactionsOtComponent } from './value-of-transactions-ot.component';

describe('ValueOfTransactionsOtComponent', () => {
  let component: ValueOfTransactionsOtComponent;
  let fixture: ComponentFixture<ValueOfTransactionsOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueOfTransactionsOtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueOfTransactionsOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
