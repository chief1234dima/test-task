import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ttValidationMessage]',
})
export class ValidationMessageDirective implements OnInit, OnDestroy {
  private control: FormControl;
  private subscription: Subscription;
  private controlName: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngControl: NgControl,
  ) {}

  ngOnInit(): void {
    this.control = this.ngControl.control as FormControl;
    this.controlName = this.ngControl.name as string;
    this.subscription = this.control.statusChanges.subscribe(() => {
      this.setValidationMessage();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setValidationMessage(): void {
    const errorMessage = this.getErrorMessage();
    const parent = this.el.nativeElement.parentNode;
    let errorElement = parent.querySelector('.validation-message');

    if (errorMessage) {
      if (!errorElement) {
        errorElement = this.renderer.createElement('div');
        this.renderer.addClass(errorElement, 'validation-message');
        this.renderer.appendChild(parent, errorElement);
      }
      this.renderer.setProperty(errorElement, 'innerText', errorMessage);
      this.renderer.addClass(this.el.nativeElement, 'invalid-input');
    } else {
      if (errorElement) {
        this.renderer.removeChild(parent, errorElement);
      }
      this.renderer.removeClass(this.el.nativeElement, 'invalid-input');
    }
  }

  private getErrorMessage(): string | null {
    if (this.control.errors) {
      return `Please provide a correct ${this.controlName.charAt(0).toUpperCase()}${this.controlName.slice(1)}`;
    }
    return null;
  }
}
