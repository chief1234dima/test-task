import { Injectable } from '@angular/core';
import { ApiConnector } from '../../../api/connectors';
import { Observable } from 'rxjs';
import {
  CheckUserResponseData,
  SubmitFormResponseData,
} from '../../../shared/interface/responses';

@Injectable({
  providedIn: 'root',
})
export class FormOrchestratorService {
  constructor(private apiConnector: ApiConnector) {}

  validateUser(username: string): Observable<CheckUserResponseData> {
    return this.apiConnector.validateUser(username);
  }

  submitForm(data: object): Observable<SubmitFormResponseData> {
    return this.apiConnector.submitForm(data);
  }
}
