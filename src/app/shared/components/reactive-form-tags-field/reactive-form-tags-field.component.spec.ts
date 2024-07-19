import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormTagsFieldComponent } from './reactive-form-tags-field.component';

describe('ReactiveFormTagsFieldComponent', () => {
  let component: ReactiveFormTagsFieldComponent;
  let fixture: ComponentFixture<ReactiveFormTagsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormTagsFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormTagsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
