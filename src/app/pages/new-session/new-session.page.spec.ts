import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewSessionPage } from './new-session.page';

describe('NewSessionPage', () => {
  let component: NewSessionPage;
  let fixture: ComponentFixture<NewSessionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
