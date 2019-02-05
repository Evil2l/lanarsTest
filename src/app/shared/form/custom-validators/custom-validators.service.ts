import {AbstractControl} from '@angular/forms';

export class CustomValidators {

  public static emailValidator(control: AbstractControl): { [key: string]: any } {
      const emailRegex = /[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
      const value = control.value;
      if (!value) {
          return null;
      }
      const result = emailRegex.test(value);

      if (result) {
          return null;
      } else {
          return {'emailValidator': {value}};
      }
  }

}
