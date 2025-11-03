import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Submitreview } from './submitreview';

describe('Submitreview', () => {
  let component: Submitreview;
  let fixture: ComponentFixture<Submitreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Submitreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Submitreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
});
