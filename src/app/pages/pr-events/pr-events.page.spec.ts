import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrEventsPage } from './pr-events.page';

describe('PrEventsPage', () => {
  let component: PrEventsPage;
  let fixture: ComponentFixture<PrEventsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
