import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allsubmissions } from './allsubmissions';

describe('Allsubmissions', () => {
  let component: Allsubmissions;
  let fixture: ComponentFixture<Allsubmissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Allsubmissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Allsubmissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
