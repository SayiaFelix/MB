import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordMatcherComponent } from './word-matcher.component';

describe('WordMatcherComponent', () => {
  let component: WordMatcherComponent;
  let fixture: ComponentFixture<WordMatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordMatcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
