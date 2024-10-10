import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControls, FormStatus } from '../../../../shared/enum';
import { countryValidator, UsernameValidator } from '../../validators';
import { map } from 'rxjs/operators';
import { FormOrchestratorService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tt-form-container',
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
})
export class FormContainerComponent implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private usernameValidator: UsernameValidator,
    private formService: FormOrchestratorService,
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  form: FormGroup = this.fb.group({
    [FormControls.Array]: this.fb.array([]),
  });
  isSubmitting = false;
  timer = 0;
  timerInterval: any;
  subscription: Subscription;

  invalidFormCount$ = this.form.valueChanges.pipe(
    map(
      () =>
        this.formArr.controls.filter(
          ({ status }) =>
            status === FormStatus.Invalid || status === FormStatus.Pending,
        ).length,
    ),
  );

  get formArr(): FormArray {
    return this.form.get(FormControls.Array) as FormArray;
  }

  addForm(): void {
    if (this.formArr.controls.length >= 10) {
      return;
    }
    this.formArr.push(this.createChildForm());
  }

  removeForm(index: number): void {
    this.formArr.removeAt(index);
  }

  submit(): void {
    if (this.isSubmitting) {
      this.clearTimer();
      return;
    }

    if (this.form.invalid || !this.formArr.controls.length) {
      return;
    }

    this.form.disable();
    this.isSubmitting = true;
    this.timer = 5;
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.completeSubmission();
      }
    }, 1000);
  }

  clearTimer(): void {
    clearInterval(this.timerInterval);
    this.isSubmitting = false;
    this.timer = 0;
    this.form.enable();
  }

  completeSubmission(): void {
    this.clearTimer();
    this.subscription = this.formService
      .submitForm(this.form.value)
      .subscribe((result) => {
        console.log(result);
      });
  }

  createChildForm(): FormGroup {
    return this.fb.group({
      [FormControls.Country]: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [countryValidator()],
          updateOn: 'blur',
        },
      ],
      [FormControls.Username]: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [this.usernameValidator.validateUsername()],
          updateOn: 'blur',
        },
      ],
      [FormControls.Birthday]: ['', Validators.required],
    });
  }
}
