import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ReactiveFormErrors } from './reactive-form.errors';
import { IReactiveFormField } from '../../interfaces/reactive-form-field.interface';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  @Input() class: string;
  @Input() form_schema: IReactiveFormField[];
  @Input() form_names: {[ key: string ]: string};
  @Output() on_change: EventEmitter<UntypedFormGroup> = new EventEmitter();
  @Output() on_submit: EventEmitter<UntypedFormGroup> = new EventEmitter();
  @Output() invalid: EventEmitter<boolean> = new EventEmitter();
  form: UntypedFormGroup;
  errors: ReactiveFormErrors = new ReactiveFormErrors();
  
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(){
    let generated_form = {};
    
    this.form_schema.forEach(field => {
      generated_form = {
        ...generated_form,
        [field.name]: [field.value, field.validators]
      }
    });

    this.form = this.fb.group(generated_form);
    
    const status = () => this.form.status === 'INVALID' ? true : false;
    
    this.on_change.emit(this.form.value);
    this.invalid.emit(status());
    
    this.form.valueChanges.subscribe(form => {
      this.invalid.emit(status());
      this.on_change.emit(form);
    });
  }

  submit(form: UntypedFormGroup){
    this.on_submit.emit(form);
  }

  control_error(control_name: string): string {
    const control = this.form.get(control_name)!;
    const name_to_display = this.form_names[control_name];
    const errors = this.errors;

    if (control.hasError('required')) return errors.required(name_to_display);

    if (control.hasError('minlength')) return errors.minlength(control!.errors!['minlength'].requiredLength);

    if (control.hasError('tags_max_length')) return errors.tags_max_length();

    return '';
  }
}
