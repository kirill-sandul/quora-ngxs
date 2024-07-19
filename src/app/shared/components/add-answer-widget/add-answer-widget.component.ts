import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WidgetComponent } from '../widget/widget.component';
import { IReactiveFormField } from '../../interfaces/reactive-form-field.interface';

@Component({
  selector: 'app-add-answer-widget',
  templateUrl: '../widget/widget.component.html',
  styleUrls: ['../widget/widget.component.scss']
})
export class AddAnswerWidgetComponent extends WidgetComponent {
  override title = 'Напишите ответ';
  override button_text = 'Создать';
  override button_icon = 'create';
  override form_schema: IReactiveFormField[] = [
    {
      name: 'text',
      label: 'Добавьте ответ',
      value: '',
      validators: [Validators.required, Validators.minLength(10)],
      class: 'field',
      type: 'textarea'
    }
  ]
  override form_names = {
    text: 'текст'
  }
  override form: any;
  invalid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) override data: { text: string },
    override widgetRef: MatDialogRef<AddAnswerWidgetComponent>
  ) {
    super();
  }
}
