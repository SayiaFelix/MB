import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFinderComponent } from './character-finder.component';

describe('CharacterFinderComponent', () => {
  let component: CharacterFinderComponent;
  let fixture: ComponentFixture<CharacterFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
