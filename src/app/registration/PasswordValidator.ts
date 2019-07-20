import { FormGroup, Validators, FormControl  } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

// custom validator to check that two fields match

export class PasswordValidator extends Validators {

  static passwordMatch(group: FormGroup) {
      console.log('HI 1');
      const message = {
        'group.controls.PasswordValidator.passwordMatch': {
          'message': 'Passwords do not match'
            }
        };
      if (group.controls.password1.errors && !group.controls.password2.errors.passwordMatch) {
        console.log('HI 2');
        return;
    }

      if (group.controls.password1.value !== group.controls.password2.value) {
        console.log('HI 3' + JSON.stringify(message));
      // group.controls.password2.setErrors({ passwordMatch: true });
        return message;
      } else {
        console.log('HI 4');
        // group.controls.password2.setErrors(null);
        return (null);
      }
    }
  }


/*export function passwordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.passwordMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}*/
