import { Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { WidgetComponent } from '../widget/widget.component';
import { ITag } from '../../interfaces/tag.interface';
import { IReactiveFormField } from '../../interfaces/reactive-form-field.interface';
import { tags_control_validator } from '../../tags.validator';

@Component({
  selector: 'app-edit-question-widget',
  templateUrl: '../widget/widget.component.html',
  styleUrls: ['./edit-question-widget.component.scss']
})
export class EditQuestionWidgetComponent extends WidgetComponent {
  override title = 'Изменить вопрос';
  override button_text = 'Обновить';
  override button_icon = 'update';
  override form: any;
  override form_names = {
    title: 'название',
    description: 'описание',
    tags: 'тэги'
  }
  override form_schema: IReactiveFormField[] = [
    {
      name: 'title',
      label: 'Название',
      value: this.data.title,
      validators: [Validators.required, Validators.minLength(5)],
      class: 'field'
    },
    {
      name: 'description',
      label: 'Описание',
      value: this.data.description,
      validators: [Validators.minLength(10)],
      type: 'textarea',
      class: 'field'
    },
    {
      name: 'tags',
      label: 'Тэги',
      value: this.data.tags,
      validators: [tags_control_validator],
      type: 'tags',
      class: 'field'
    }
  ]
  invalid: boolean = true;

  constructor(
    override widgetRef: MatDialogRef<EditQuestionWidgetComponent>,
    @Inject(MAT_DIALOG_DATA) override data: { title: string, description: string, tags: ITag[] }
  ) {
    super();
  }
}
