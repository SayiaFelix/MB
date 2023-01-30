import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMixerComponent } from './text-mixer.component';

describe('TextMixerComponent', () => {
  let component: TextMixerComponent;
  let fixture: ComponentFixture<TextMixerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextMixerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextMixerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
