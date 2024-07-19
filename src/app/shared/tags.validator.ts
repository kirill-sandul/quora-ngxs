import { FormControl } from '@angular/forms';

export const tags_control_validator = (c: FormControl) => {
  if (c.value && c.value.length === 0) {
    return {
      required: true
    };
  }

  if (c.value && c.value.length > 5) {
    return {
      tags_max_length: true
    }
  }

  return null;
}