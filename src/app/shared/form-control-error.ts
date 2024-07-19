import { UntypedFormGroup } from '@angular/forms';

export const form_control_error = (form: UntypedFormGroup, form_names: any, name: string): string => {
  const control = form.get(name)!;
  const name_to_display = form_names[name];
  
  if (control.hasError('required')) return `Вы должны ввести ${name_to_display}`; // default error

  if (control.hasError('minlength')) return `Поле должно содержать не меньше ${control!.errors!['minlength'].requiredLength} символов`;

  if (control.hasError('tags_max_length')) return `Вы можете ввести не больше 5 тэгов`;

  return '';
}