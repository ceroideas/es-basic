import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoutingPage } from './scouting.page';

describe('ScoutingPage', () => {
  let component: ScoutingPage;
  let fixture: ComponentFixture<ScoutingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
