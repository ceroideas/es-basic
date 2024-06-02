import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerrainPage } from './terrain.page';

describe('TerrainPage', () => {
  let component: TerrainPage;
  let fixture: ComponentFixture<TerrainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
