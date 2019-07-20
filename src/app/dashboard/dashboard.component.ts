import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { AppService } from '../app.service';
import { pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AfterContentInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { nodeValue } from '@angular/core/src/view';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  detail: [any];
  element: [any];
  select: [any];
  name: any;
  email: any;
  image: any;
  isActive: boolean;
  len: number;

  @ViewChild('tref') PanelRef: ElementRef;
  // @ViewChildren('tref') PanelRef: ElementRef;

  @Input() act: boolean;
  @Input() checked: boolean;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router,
              public appService: AppService, private fb: FormBuilder) {
    this.appService.getJSON().subscribe(data => {
      console.log(data);
      this.detail = data;
    }, (err) => {
      console.log('Error Occured');
    });
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  toggleAccordian(event, index) {
    const element = event.target;
    element.classList.toggle('active');
    if (this.detail[index].isActive) {
      this.detail[index].isActive = false;
    } else {
      this.detail[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
}


  toggleAccordianAll(event) {
    // this.element = document.querySelectorAll('.friend-list');
    this.element = this.PanelRef.nativeElement.querySelectorAll('.friend-list');
    console.log(this.checked);
    this.select = this.PanelRef.nativeElement.querySelectorAll('.check');
    console.log(this.select);
    if (!this.act) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.detail.length; i++) {
        if (this.select[i].checked) {
          console.log('add 1');
          this.element[i].classList.add('active');
          const panel = this.element[i].nextElementSibling;
          if (panel.style.maxHeight) {
            // document.querySelector('.open').innerHTML = 'Expand All';
            this.PanelRef.nativeElement.querySelector('.open').innerHTML = 'Expand All';
            panel.style.maxHeight = null;
          } else {
            // document.querySelector('.open').innerHTML = 'Close All';
            this.PanelRef.nativeElement.querySelector('.open').innerHTML = 'Close All';
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
          this.checked = false;
        } /*else {
          this.element[i].classList.remove('active');
          const panel = this.element[i].nextElementSibling;
          if (panel.style.maxHeight) {
            // document.querySelector('.open').innerHTML = 'Expand All';
            this.PanelRef.nativeElement.querySelector('.open').innerHTML = 'Expand All';
            panel.style.maxHeight = null;
          } else {
            // document.querySelector('.open').innerHTML = 'Close All';
            this.PanelRef.nativeElement.querySelector('.open').innerHTML = 'Close All';
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        }*/
      }
      this.act = true;
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.detail.length; i++) {
        if (!this.select[i].checked) {
          console.log('add 3');
          this.element[i].classList.add('active');
          const panel = this.element[i].nextElementSibling;
          if (panel.style.maxHeight) {
            // document.querySelector('.open').innerHTML = 'Expand All';
            this.PanelRef.nativeElement.querySelector('.open').innerHTML = 'Expand All';
            panel.style.maxHeight = null;
          } else {
            // document.querySelector('.open').innerHTML = 'Close All';
            this.PanelRef.nativeElement.querySelector('.open').innerHTML = 'Close All';
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        } /*else {
          console.log('add 4');
          this.element[i].classList.remove('active');
          const panel = this.element[i].nextElementSibling;
          if (panel.style.maxHeight) {
            // document.querySelector('.open').innerHTML = 'Expand All';
            this.PanelRef.nativeElement.querySelector('.open').innerHTML = 'Expand All';
            panel.style.maxHeight = null;
          } else {
            // document.querySelector('.open').innerHTML = 'Close All';
            this.PanelRef.nativeElement.querySelector('.open').innerHTML = 'Close All';
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        }*/
      }
    }
}

  changeImage(nm, em, im) {
    this.name = nm;
    this.email = em;
    this.image = im;

    sessionStorage.setItem('editName', this.name);
    sessionStorage.setItem('editEmail', this.email);
    sessionStorage.setItem('editImage', this.image);

    this.router.navigate(['/edit']);

  }

  onSubmit() {
    this.authService.logout();
  }
}
