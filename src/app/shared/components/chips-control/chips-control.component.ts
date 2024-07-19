import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { SPACE, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-chips-control',
  templateUrl: './chips-control.component.html',
  styleUrls: ['./chips-control.component.scss']
})
export class ChipsControlComponent {
  @Input() label: string;
  @Input() class: string;
  @Input() form: UntypedFormGroup;
  @Input() control_error: Function;
  readonly separator_keys_codes = [SPACE, ENTER] as const;

  constructor() {}
  
  add_chip(event: MatChipInputEvent) {
    const input = event.chipInput!.inputElement;
    const value = event.value;
    const tags = this.form.get('tags')!;

    if (tags.value.indexOf(value) !== -1) return;
    if ((value || '').trim()) {
      tags.value.push(value);
      tags.updateValueAndValidity();
    }

    if (input) input.value = '';
  }

  remove_chip(tag: string) {
    const tags = this.form.get('tags')!;

    tags.setValue(tags.value.filter((t: string) => t !== tag));
    tags.updateValueAndValidity();
  }
}
