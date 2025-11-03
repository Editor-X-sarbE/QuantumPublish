import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assignedreview } from './assignedreview';

describe('Assignedreview', () => {
  let component: Assignedreview;
  let fixture: ComponentFixture<Assignedreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assignedreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assignedreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
