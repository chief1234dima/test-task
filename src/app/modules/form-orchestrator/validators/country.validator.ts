import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Country } from '../../../shared/enum';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export function countryValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const validCountries = Object.values(Country);
    return timer(200).pipe(
      map(() =>
        validCountries.includes(control.value)
          ? null
          : { invalidCountry: true },
      ),
    );
  };
}
