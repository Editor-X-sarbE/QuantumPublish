import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubmission } from './update-submission';

describe('UpdateSubmission', () => {
  let component: UpdateSubmission;
  let fixture: ComponentFixture<UpdateSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSubmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubmission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
