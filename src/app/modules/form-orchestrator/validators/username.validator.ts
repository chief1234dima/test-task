import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { FormOrchestratorService } from '../services';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsernameValidator {
  constructor(private formOrchestratorService: FormOrchestratorService) {}

  validateUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return this.formOrchestratorService.validateUser(control.value).pipe(
        map((response) =>
          response.isAvailable ? null : { usernameTaken: true },
        ),
        catchError(() => of(null)),
      );
    };
  }
}
