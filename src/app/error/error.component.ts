import { Component, OnInit, Input} from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit {

  private static readonly errorMessages = {
    required: () => 'This field is required',
    minlength: (params) => 'The min number of characters is ' + params.requiredLength,
    maxlength: (params) => 'The max allowed number of characters is ' + params.requiredLength,
    pattern: (params) => 'The required pattern is: ' + params.requiredPattern,
    email: (params) => 'The email is: ' + params.message,
    'group.controls.DateValidator.dateCheck': (params) => params.message,
    ValidateEmailNotTaken: (params) => params.message,
    'group.controls.PasswordValidator.passwordMatch': (params) => params.message
  };

  // msg = 'Email ID not from the list !!!!!';
  // reg = 'Please click on Login link below for logging in !!!!!';

  @Input() msg: string;
  @Input() reg: string;
  @Input() group: FormGroup;
  @Input() control: AbstractControlDirective | AbstractControl;

  constructor() { }

  ngOnInit() {
  }

  loginError(): string {
    console.log('Error Login');
    return this.msg;
  }

  success(): string {
    console.log('Successful Registration');
    return this.reg;
  }

  shouldShowErrors(): boolean {
    console.log('Control: ' + this.control + 'Error: ' + this.control.errors);
    return ((this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)) || (this.group &&
        this.group.errors &&
        (this.group.dirty || this.group.touched)));
  }

  listOfErrors(): string[] {
    return ((Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field])))
      ||
      (Object.keys(this.group.errors)
      .map(field => this.getMessage(field, this.group.errors[field]))));
  }

  private getMessage(type: string, params: any) {
    return ErrorComponent.errorMessages[type](params);
  }

}
