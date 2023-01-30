import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulMomoTransactionsComponent } from './successful-momo-transactions.component';

describe('SuccessfulMomoTransactionsComponent', () => {
  let component: SuccessfulMomoTransactionsComponent;
  let fixture: ComponentFixture<SuccessfulMomoTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulMomoTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulMomoTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
