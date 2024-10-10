import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Country, FormControls } from '../../../../shared/enum';

@Component({
  selector: 'tt-form-list-item',
  templateUrl: './form-list-item.component.html',
  styleUrl: './form-list-item.component.scss',
})
export class FormListItemComponent {
  constructor() {}

  @Input() formId: FormGroup;
  @Input() index: number;
  @Output() removeForm = new EventEmitter<number>();

  countries: string[] = Object.values(Country);
  countrySuggestions: string[] = [];
  currentDate = new Date().toISOString().split('T')[0];

  setCountrySuggestions(value: string): void {
    this.countrySuggestions = value
      ? this.countries.filter((country) =>
          country.toLowerCase().includes(value.toLowerCase()),
        )
      : [];
  }

  getFormControl(controlName: string): FormControl {
    return (this.formId.get(FormControls.Array) as FormArray)
      ?.at(this.index)
      .get(controlName) as FormControl;
  }

  onCountrySelectionChange(value: string): void {
    this.getFormControl(FormControls.Country)?.setValue(value);
    this.countrySuggestions = [];
  }
}
