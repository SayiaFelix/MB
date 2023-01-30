import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseMakerComponent } from './phrase-maker.component';

describe('PhraseMakerComponent', () => {
  let component: PhraseMakerComponent;
  let fixture: ComponentFixture<PhraseMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhraseMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhraseMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
