import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

// custom validator to check that two fields match

export class DateValidator extends Validators {

  static dateCheck(group: FormGroup) {
    const message1 = {
      'group.controls.DateValidator.dateCheck': {
        'message': 'Enter Month and Year'
          }
      };
    const message2 = {
        'group.controls.DateValidator.dateCheck': {
          'message': 'Enter Day and Year'
            }
        };
    const message3 = {
      'group.controls.DateValidator.dateCheck': {
        'message': 'Enter Day and Month'
          }
      };
    const message4 = {
      'group.controls.DateValidator.dateCheck': {
        'message': 'Enter Day'
          }
      };
    const message5 = {
      'group.controls.DateValidator.dateCheck': {
        'message': 'Enter Month'
          }
      };
    const message6 = {
      'group.controls.DateValidator.dateCheck': {
        'message': 'Enter Year'
          }
      };

    if (group.controls.day.errors || group.controls.month.errors || group.controls.year.errors) {
      return;
    }

    if (group.controls.day.value && !group.controls.month.value && !group.controls.year.value) {
      /*group.controls.month.setErrors({ dateCheck: true });
      group.controls.year.setErrors({ dateCheck: true });*/
      return message1;
    } else if (!group.controls.day.value && group.controls.month.value && !group.controls.year.value) {
      /*group.controls.day.setErrors({ dateCheck: true });
      group.controls.year.setErrors({ dateCheck: true });*/
      return message2;
    } else if (!group.controls.day.value && !group.controls.month.value && group.controls.year.value) {
      /*group.controls.day.setErrors({ dateCheck: true });
      group.controls.month.setErrors({ dateCheck: true });*/
      return message3;
    } else if (!group.controls.day.value && group.controls.month.value && group.controls.year.value) {
      /*group.controls.day.setErrors({ dateCheck: true });
      group.controls.month.setErrors({ dateCheck: true });*/
      return message4;
    } else if (group.controls.day.value && !group.controls.month.value && group.controls.year.value) {
      /*group.controls.day.setErrors({ dateCheck: true });
      group.controls.month.setErrors({ dateCheck: true });*/
      return message5;
    } else if (group.controls.day.value && group.controls.month.value && !group.controls.year.value) {
      /*group.controls.day.setErrors({ dateCheck: true });
      group.controls.month.setErrors({ dateCheck: true });*/
      return message6;
    }
  }
}

/*export function dateCheck(controlName1: string, controlName2: string, controlName3: string) {
    return (formGroup: FormGroup) => {
        const day = formGroup.controls[controlName1];
        const month = formGroup.controls[controlName2];
        const year = formGroup.controls[controlName3];

        if (day.errors || month.errors || year.errors) {
            return;
        }

        if (day.value && !month.value && !year.value) {
            month.setErrors({ dateCheck: true });
            year.setErrors({ dateCheck: true });
        } else if (!day.value && month.value && !year.value) {
            day.setErrors({ dateCheck: true });
            year.setErrors({ dateCheck: true });
        } else if (!day.value && !month.value && year.value) {
            day.setErrors({ dateCheck: true });
            month.setErrors({ dateCheck: true });
        }
    };
}*/
