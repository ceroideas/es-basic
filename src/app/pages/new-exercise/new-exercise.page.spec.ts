import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewExercisePage } from './new-exercise.page';

describe('NewExercisePage', () => {
  let component: NewExercisePage;
  let fixture: ComponentFixture<NewExercisePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
