import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControls } from '../../../../shared/enum';
import { countryValidator, UsernameValidator } from '../../validators';

@Component({
  selector: 'tt-form-container',
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
})
export class FormContainerComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private usernameValidator: UsernameValidator,
  ) {}

  form: FormGroup = this.fb.group({
    formArr: this.fb.array([]),
  });

  ngOnInit(): void {}

  get formArr(): FormArray {
    return this.form.get(FormControls.Array) as FormArray;
  }

  addForm(): void {
    this.formArr.push(this.createChildForm());
  }

  removeForm(index: number): void {
    this.formArr.removeAt(index);
  }

  submit(): void {
    console.log(this.form.value);
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
