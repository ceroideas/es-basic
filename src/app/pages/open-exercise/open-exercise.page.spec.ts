import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenExercisePage } from './open-exercise.page';

describe('OpenExercisePage', () => {
  let component: OpenExercisePage;
  let fixture: ComponentFixture<OpenExercisePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
