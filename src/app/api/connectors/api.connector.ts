import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAbstractAdapter } from '../abstract-adapters';
import {
  CheckUserResponseData,
  SubmitFormResponseData,
} from '../../shared/interface/responses';

@Injectable({ providedIn: 'root' })
export class ApiConnector {
  constructor(protected adapter: ApiAbstractAdapter) {}

  validateUser(username: string): Observable<CheckUserResponseData> {
    return this.adapter.validateUser(username);
  }

  submitForm(data: object): Observable<SubmitFormResponseData> {
    return this.adapter.submitForm(data);
  }
}
