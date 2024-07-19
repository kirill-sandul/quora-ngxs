import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnswerWidgetComponent } from './edit-answer-widget.component';

describe('EditAnswerWidgetComponent', () => {
  let component: EditAnswerWidgetComponent;
  let fixture: ComponentFixture<EditAnswerWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnswerWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnswerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
