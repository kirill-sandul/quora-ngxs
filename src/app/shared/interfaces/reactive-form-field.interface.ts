import { Validators } from '@angular/forms';

export interface IReactiveFormField {
  name: string,
  label: string,
  value: any,
  validators: Validators[],
  appearance?: string,
  type?: string,
  class?: string,
  placeholder?: string
}