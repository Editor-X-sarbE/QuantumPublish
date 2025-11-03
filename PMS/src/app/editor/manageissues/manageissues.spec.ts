import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Manageissues } from './manageissues';

describe('Manageissues', () => {
  let component: Manageissues;
  let fixture: ComponentFixture<Manageissues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manageissues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Manageissues);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
