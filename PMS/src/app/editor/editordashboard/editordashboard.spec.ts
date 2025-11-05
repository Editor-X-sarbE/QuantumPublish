import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editordashboard } from './editordashboard';

describe('Editordashboard', () => {
  let component: Editordashboard;
  let fixture: ComponentFixture<Editordashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editordashboard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Editordashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
