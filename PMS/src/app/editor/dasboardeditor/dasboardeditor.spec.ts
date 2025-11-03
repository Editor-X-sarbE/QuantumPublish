import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dasboardeditor } from './dasboardeditor';

describe('Dasboardeditor', () => {
  let component: Dasboardeditor;
  let fixture: ComponentFixture<Dasboardeditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dasboardeditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dasboardeditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
