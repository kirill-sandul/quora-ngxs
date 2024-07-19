import { MatChipInputEvent } from '@angular/material/chips';
import { SPACE, ENTER } from '@angular/cdk/keycodes';
import { UntypedFormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reactive-form-tags-field',
  templateUrl: './reactive-form-tags-field.component.html',
  styleUrls: ['./reactive-form-tags-field.component.scss']
})
export class ReactiveFormTagsFieldComponent {
  @Input() class: string;
  @Input() form: UntypedFormGroup;
  @Input() field: any;
  @Input() control_error: Function;
  readonly separator_keys_codes = [SPACE, ENTER] as const;

  constructor() {}

  add_chip(event: MatChipInputEvent) {
    const input = event.chipInput!.inputElement;
    const value = event.value;
    const tags = this.form.get(this.field.name)!;

    if (tags.value.indexOf(value) !== -1) return;
    if ((value || '').trim()) {
      tags.value.push(value);
      tags.updateValueAndValidity();
    }

    if (input) input.value = '';
  }

  remove_chip(tag: string) {
    const tags = this.form.get(this.field.name)!;

    tags.setValue(tags.value.filter((t: string) => t !== tag));
    tags.updateValueAndValidity();
  }
}
