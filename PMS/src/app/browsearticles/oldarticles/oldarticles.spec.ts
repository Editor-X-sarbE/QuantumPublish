import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oldarticles } from './oldarticles';

describe('Oldarticles', () => {
  let component: Oldarticles;
  let fixture: ComponentFixture<Oldarticles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oldarticles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Oldarticles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
