import { Directive, ElementRef, Renderer } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})

export class HoverDirective {
  change: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  /*@HostListener('mouseenter') onMouseEnter() {
    this.hover('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hover(null);
  }

  private hover(color: string) {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }*/

  @HostListener('mouseover', ['$event'])
  onApphover(event: MouseEvent) {
      this.change = true;
      console.log('mouse hover started' + this.elementRef.nativeElement.offsetHeight + this.change);
      // this.renderer.setElementStyle(this.elementRef.nativeElement, 'backgroundColor', 'gray');
  }
  @HostListener('mouseleave', ['$event'])
  onDone(event: AnimationEvent) {
      this.change = false;
      console.log('mouse hover ended' + this.change);
      // this.renderer.setElementStyle(this.elementRef.nativeElement, 'backgroundColor', 'white');
  }
}
