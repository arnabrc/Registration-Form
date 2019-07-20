import { AbstractControl, AsyncValidator, ValidationErrors, FormControl, FormGroup } from '@angular/forms';
import { EmailService } from '../email.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoaderInterceptorService } from '../loader-interceptor.service';
import { LoaderService } from '../loader.service';

// export class ValidateEmailNotTaken implements AsyncValidator {
  // static emailService: any;
  // static validate: any;
export class ValidateEmailNotTaken {

  // constructor(private emailService: EmailService) {}

  /*validate(
        control: AbstractControl
      ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  return this.emailService.checkEmailNotTaken(control.value).pipe(map(res => {
          return res ? null : { emailTaken: true };
        }));
      }*/
  // static createValidator(group: FormGroup) {
    // tslint:disable-next-line:align

    static createValidator(emailService: EmailService) {
      const message = {
        'ValidateEmailNotTaken': {
          'message': 'Email is taken'
        }
      };
      return (control: AbstractControl) => {
        return emailService.checkEmailNotTaken(control.value).pipe(map(res => {
          // return res ? null : { emailTaken: true };
          return res ? null : message;
          // return res ? { emailNotTaken: true } : { emailTaken: true };
        }));
      };
    }
 }
