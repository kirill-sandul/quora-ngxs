import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionWidgetComponent } from './edit-question-widget.component';

describe('EditQuestionWidgetComponent', () => {
  let component: EditQuestionWidgetComponent;
  let fixture: ComponentFixture<EditQuestionWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestionWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
