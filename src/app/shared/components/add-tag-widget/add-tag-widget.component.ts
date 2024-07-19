import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WidgetComponent } from '../widget/widget.component';
import { IReactiveFormField } from '../../interfaces/reactive-form-field.interface';

@Component({
  selector: 'app-add-tag-widget',
  templateUrl: '../widget/widget.component.html',
  styleUrls: ['./add-tag-widget.component.scss']
})
export class AddTagWidgetComponent extends WidgetComponent {
  override title = 'Добавьте тэг';
  override button_text = 'Создать';
  override button_icon = 'create';
  override form: any;
  override form_names = {
    name: 'название тэга',
    description: 'описание тэга'
  }
  override form_schema: IReactiveFormField[] = [
    {
      name: 'name',
      label: 'Название',
      validators: [Validators.required, Validators.minLength(2)],
      value: ''
    },
    {
      name: 'description',
      label: 'Описание',
      validators: [Validators.required, Validators.minLength(10)],
      value: ''
    }
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) override data: { name: string, description: string },
    override widgetRef: MatDialogRef<AddTagWidgetComponent>
  ) {
    super();
  }
}
