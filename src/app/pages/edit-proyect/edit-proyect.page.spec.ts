import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProyectPage } from './edit-proyect.page';

describe('EditProyectPage', () => {
  let component: EditProyectPage;
  let fixture: ComponentFixture<EditProyectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProyectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
