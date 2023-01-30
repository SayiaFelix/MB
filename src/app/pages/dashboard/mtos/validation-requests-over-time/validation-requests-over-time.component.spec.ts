import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRequestsOverTimeComponent } from './validation-requests-over-time.component';

describe('ValidationRequestsOverTimeComponent', () => {
  let component: ValidationRequestsOverTimeComponent;
  let fixture: ComponentFixture<ValidationRequestsOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationRequestsOverTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationRequestsOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
