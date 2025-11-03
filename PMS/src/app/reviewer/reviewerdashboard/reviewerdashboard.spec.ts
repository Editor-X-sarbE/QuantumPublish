import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reviewerdashboard } from './reviewerdashboard';

describe('Reviewerdashboard', () => {
  let component: Reviewerdashboard;
  let fixture: ComponentFixture<Reviewerdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reviewerdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reviewerdashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
