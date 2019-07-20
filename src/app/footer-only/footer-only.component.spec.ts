import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterOnlyComponent } from './footer-only.component';

describe('FooterOnlyComponent', () => {
  let component: FooterOnlyComponent;
  let fixture: ComponentFixture<FooterOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
