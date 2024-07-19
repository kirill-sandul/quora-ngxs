import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WidgetComponent } from '../widget/widget.component';
import { IReactiveFormField } from '../../interfaces/reactive-form-field.interface';

@Component({
  selector: 'app-edit-answer-widget',
  templateUrl: '../widget/widget.component.html',
  styleUrls: ['./edit-answer-widget.component.scss']
})
export class EditAnswerWidgetComponent extends WidgetComponent {
  override title = 'Измените ответ';
  override button_text = 'Обновить';
  override button_icon = 'update'; 
  override form_names = {
    text: 'текст'
  }
  override form: any;
  override form_schema: IReactiveFormField[] = [
    {
      name: 'text',
      label: 'Текст',
      value: this.data.text,
      validators: [Validators.required, Validators.minLength(10)],
      type: 'textarea',
      class: 'field'
    }
  ]
  invalid: boolean = true;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) override data: { text: string },
    override widgetRef: MatDialogRef<EditAnswerWidgetComponent>
    ) {
    super();
  }
}
