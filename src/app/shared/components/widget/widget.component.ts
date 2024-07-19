import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IReactiveFormField } from '../../interfaces/reactive-form-field.interface';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {
  title: string = '';
  button_text: string = '';
  button_icon: string = '';
  data: any;
  form: any;
  invalid_form: boolean;
  form_schema: IReactiveFormField[];
  form_names: { [name: string]: string };
  widgetRef: MatDialogRef<WidgetComponent>;

  constructor() {
    this.modify_schema();
  }

  modify_schema(){
    if(this.form_schema) this.form_schema.forEach((field, index) => {
      if(!field.class) this.form_schema[index].class = 'field';
    });
  }

  close() {
    this.widgetRef.close();
  }
}
