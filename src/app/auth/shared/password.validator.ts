/** A hero's name can't match the given regular expression */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchPassword(): ValidatorFn {

  return (repeatPW: AbstractControl): {[key: string]: any} => {

    const fg = repeatPW.parent;

    if (fg) {
      const pw = fg.get('password');
      return pw.value !== repeatPW.value ? {'no-match': {value: repeatPW.value}} : null;
    }
    return null;
  };
}
