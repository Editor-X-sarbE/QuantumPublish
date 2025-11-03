import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assignreviewers } from './assignreviewers';

describe('Assignreviewers', () => {
  let component: Assignreviewers;
  let fixture: ComponentFixture<Assignreviewers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assignreviewers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assignreviewers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
