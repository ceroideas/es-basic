import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameSheetPage } from './game-sheet.page';

describe('GameSheetPage', () => {
  let component: GameSheetPage;
  let fixture: ComponentFixture<GameSheetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
