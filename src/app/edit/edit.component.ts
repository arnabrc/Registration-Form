import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupDirective} from '@angular/forms';
import { Component, OnInit, Host, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  name: any;
  email: any;
  image: any;
  profileFormEdit: FormGroup;

  /*@Input() editName: any;
  @Input() editEmail: any;
  @Input() editImage: any;*/

  constructor(public router: Router, public route: ActivatedRoute, private fb: FormBuilder,
              private auth: AuthService, private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.profileFormEdit = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3),
              Validators.pattern('^[A-Za-z]{2,15}$')])],
      email: ['', Validators.compose([Validators.required, Validators.email,
              Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')])],
      image: [''],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    });

    /*this.name = this.route.snapshot.paramMap.get('name');
    this.email = this.route.snapshot.paramMap.get('email');
    this.image = this.route.snapshot.paramMap.get('image');*/

    // this.name = this.route.snapshot.queryParamMap.get('name');

    /*this.route.queryParamMap.subscribe(queryParams => {
      this.name = queryParams.get('name');
      this.email = queryParams.get('email');
      this.image = queryParams.get('image');
    });*/

    this.name = sessionStorage.getItem('editName');
    this.email = sessionStorage.getItem('editEmail');
    this.image = sessionStorage.getItem('editImage');

  }

  browse() { }

  onSubmit() { }

}
