import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRequestsByMtoComponent } from './validation-requests-by-mto.component';

describe('ValidationRequestsByMtoComponent', () => {
  let component: ValidationRequestsByMtoComponent;
  let fixture: ComponentFixture<ValidationRequestsByMtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationRequestsByMtoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationRequestsByMtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
