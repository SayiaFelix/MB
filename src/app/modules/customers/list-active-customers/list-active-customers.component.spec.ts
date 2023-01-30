import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiveCustomersComponent } from './list-active-customers.component';

describe('ListActiveCustomersComponent', () => {
  let component: ListActiveCustomersComponent;
  let fixture: ComponentFixture<ListActiveCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActiveCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActiveCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
