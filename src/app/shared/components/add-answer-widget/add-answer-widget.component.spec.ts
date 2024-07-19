import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswerWidgetComponent } from './add-answer-widget.component';

describe('AddAnswerWidgetComponent', () => {
  let component: AddAnswerWidgetComponent;
  let fixture: ComponentFixture<AddAnswerWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnswerWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnswerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
