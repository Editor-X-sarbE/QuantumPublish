import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionManagement } from './revision-management';

describe('RevisionManagement', () => {
  let component: RevisionManagement;
  let fixture: ComponentFixture<RevisionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
