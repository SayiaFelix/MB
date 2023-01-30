import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsByMomoBarComponent } from './transactions-by-momo-bar.component';

describe('TransactionsByMomoBarComponent', () => {
  let component: TransactionsByMomoBarComponent;
  let fixture: ComponentFixture<TransactionsByMomoBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsByMomoBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsByMomoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
