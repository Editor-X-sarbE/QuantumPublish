import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeHistory } from './see-history';

describe('SeeHistory', () => {
  let component: SeeHistory;
  let fixture: ComponentFixture<SeeHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
