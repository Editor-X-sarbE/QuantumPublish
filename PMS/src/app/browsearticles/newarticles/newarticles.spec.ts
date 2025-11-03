import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newarticles } from './newarticles';

describe('Newarticles', () => {
  let component: Newarticles;
  let fixture: ComponentFixture<Newarticles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newarticles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newarticles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
