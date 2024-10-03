import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Country, FormControls } from '../../../../shared/enum';
import { FormOrchestratorService } from '../../services/form-orchestrator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tt-form-list-item',
  templateUrl: './form-list-item.component.html',
  styleUrl: './form-list-item.component.scss',
})
export class FormListItemComponent implements OnDestroy {
  constructor(private formService: FormOrchestratorService) {}

  @Input() formId: FormGroup;
  @Input() index: number;
  @Output() removeForm = new EventEmitter<number>();

  countries: string[] = Object.values(Country);
  countrySuggestions: string[] = [];
  subscription: Subscription;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
