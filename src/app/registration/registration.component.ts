import { Component, OnInit, ViewContainerRef, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, AbstractControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
// import { AppService } from '../app.service';
import { ValidateEmailNotTaken } from './ValidateEmailNotTaken';
import { PasswordValidator } from './PasswordValidator';
import { DateValidator } from './DateValidator';
import { EmailService } from '../email.service';
import { map, filter } from 'rxjs/operators';
import { LoaderInterceptorService } from '../loader-interceptor.service';
import { LoaderService } from '../loader.service';
import {Observable, from} from 'rxjs';
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../auth.service';
import { CanDeactivateComponent } from '../can-deactivate.guard';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements CanDeactivateComponent, OnInit {
  profileForm: FormGroup;
  submitted = false;
  sucReg = false;
  /*@ViewChild('form')
  form: NgForm;*/

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if (!this.profileForm.dirty || !this.profileForm.touched || this.profileForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  // isLoggedIn = false;

/*  fnamePattern = '^[A-Za-z]{2,15}$';
  lnamePattern = '^[A-Za-z]{2,15}$';
  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$';
  password1Pattern = '^[A-Za-z0-9]{5,12}$';
  password2Pattern = '^[A-Za-z0-9]{5,12}$';

  public Firstname: any;
  public Lastname: any;
  public Email: any;
  public Day: any;
  public Month: any;
  public Year: any;
  public Password1: any;
  public Password2: any; */

  /*get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }*/

constructor(public router: Router, public route: ActivatedRoute, private fb: FormBuilder, private emailService: EmailService,
            private load: LoaderService, private loader: LoaderInterceptorService,
            private auth: AuthService) {
} // , public admin: AdminGuard) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z]{2,15}$')])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z]{2,15}$')])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]),
      ValidateEmailNotTaken.createValidator(this.emailService)],
      // ValidateEmailNotTaken.bind(this.emailService)],
      // this.validateEmailNotTaken.bind(this)],
      dob: this.fb.group({
        day: [''], // dateCheck], // Validators.required],
        month: [''], // dateCheck], // Validators.required],
        year: [''], // dateCheck] // Validators.required]
      }, {
        // validator: dateCheck('day', 'month', 'year')
        validator: DateValidator.dateCheck
      }),
      passwords: this.fb.group({
        password1: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9]{5,12}$')])],
        // , PasswordValidator.passwordMatch],
        password2: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9]{5,12}$')])]
        // , PasswordValidator.passwordMatch]
      }, {
        // validator: passwordMatch('password1', 'password2')
        validator: PasswordValidator.passwordMatch
      }),
      aliases: this.fb.array([
        this.fb.control('')
      ])
    });

    /* Practice Start FromEvent RXJS */
    /*
    const source = from([
      { name: 'Arnab', mail: 'arnabroychowdhury6@gmail.com' },
      { name: '', mail: 'grnday72@gmail.com' },
      { name: 'Abir', mail: '' },
      { name: 'Aritra', mail: 'basu.aritra@gmail.com' }
    ]);
    // const detail = source.pipe(filter(nm => nm.name === name ));

    const detail = source.pipe(filter(em => (em.mail.length !== 0 && em.name.length !== 0)), map(dt => {
      return JSON.stringify(dt.name + ' ' + '+' + ' ' + dt.mail);
    }));

    const subscribe1 = detail.subscribe(val =>
        console.log(`Detail : ${val}`));

    /* const subscribe2 = detail.subscribe(val =>
        console.log(`Only Mail: ${val}`)); */

    /* Practice End FromEvent RXJS */

    /* window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = 'Do You Wanna Lose Your Data?';
    }); */

  }
  get firstname() { return this.profileForm.get('firstname'); }
  get lastname() { return this.profileForm.get('lastname'); }
  get email() { return this.profileForm.get('email'); }
  get dob() { return this.profileForm.get('day'); }
  get month() { return this.profileForm.get('month'); }
  get year() { return this.profileForm.get('year'); }
  get password1() { return this.profileForm.get('password1'); }
  get password2() { return this.profileForm.get('password2'); }

  /*public submit: any = () => {
    if (!this.firstname.valid) {
      this.toastr.warning('First Name Needed to proceed');
    } else if (!this.lastname.valid) {
      this.toastr.warning('Last Name Needed to proceed');
    } else if (!this.email.valid) {
      this.toastr.warning('Email Needed to proceed');
    } else if (!this.password1.valid) {
      this.toastr.warning('Password Needed to proceed');
     } else if (!this.password2.valid) {
      this.toastr.warning('Password Needed to proceed');
    } else if (this.password1.value !== this.password2.value) {
      this.toastr.warning('Passwords Do not match');
    } else {
        let data = {
          FirstName : this.firstname.value,
          LastName : this.lastname.value,
          Email : this.email.value,
          Day : this.day.value,
          Month : this.month.value,
          Year : this.year.value,
          Password1 : this.password1.value,
          Password2 : this.password2.value
        }
        // alert('Registered Successfully');
        this.toastr.success('Registration Succesful');
        console.log(data);
      }
    }*/

    onSubmit() {
      this.submitted = true;
      // this.isLoggedIn = true;
      // const isLoggedIn = 'true';
      // this.router.navigate(['/dashboard']);
      if (this.profileForm.valid) {
        // this.auth.sendToken(this.profileForm.value.email);
        // localStorage.setItem('isLoggedIn', 'true');
        // this.router.navigate(['/login']);
        this.sucReg = true;
      }
      // this.router.navigate(['/dashboard']);
      console.warn(this.profileForm.value);
    }

    /* validateEmailNotTaken(control: AbstractControl) {
      return this.em.checkEmailNotTaken(control.value).pipe(map(res => {
        // return res ? null : { emailTaken: true };
        return res ? { emailNotTaken: true } : { emailTaken: true };
      }));
    }*/
    /*validateEmailNotTaken(group: FormGroup) {
      return (control: AbstractControl) => {
        return this.emailService.checkEmailNotTaken(control.value).pipe(map(res => {
          return res ? null : { emailTaken: true };
        }));
      };
    }*/
  }

    /*findInvalidControls( _input: AbstractControl, _invalidControls: AbstractControl[] ): AbstractControl[] {
      if ( ! _invalidControls ) _invalidControls = [];
      if ( _input instanceof FormControl  ) {
          if ( _input.invalid ) _invalidControls.push( _input );
          return _invalidControls;
      }

      if ( ! (_input instanceof FormArray) && ! (_input instanceof FormGroup) ) return _invalidControls;

      const controls = _input.controls;
      for (const name in controls) {
          let control = controls[name];
          if (control.invalid) _invalidControls.push( control );
          switch( control.constructor.name )
          {
              case 'FormArray':
                  (<FormArray> control ).controls.forEach( _
                    control => _invalidControls = findInvalidControls( _control, _invalidControls ) );
                  break;

              case 'FormGroup':
                  _invalidControls = findInvalidControls( control, _invalidControls );
                  break;
          }
      }
      console.log(_invalidControls);
      return _invalidControls;
    }
  }*/

 /* public onClick1: any = () => {
    this.toastr.warning('Must contain at least one number and one uppercase and lowercase letter,
     and at least 8 or more characters');
  }

  public onClick2: any = () => {
    this.toastr.warning('Must contain at least one number and one uppercase and lowercase letter,
     and at least 8 or more characters');
  }
} */
