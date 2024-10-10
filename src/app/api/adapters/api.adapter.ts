import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiAbstractAdapter } from '../abstract-adapters';
import {
  CheckUserResponseData,
  SubmitFormResponseData,
} from '../../shared/interface/responses';
import { ApiUrl } from '../../shared/enum';

@Injectable()
export class ApiAdapter implements ApiAbstractAdapter {
  constructor(protected http: HttpClient) {}

  validateUser(username: string): Observable<CheckUserResponseData> {
    return this.http
      .post<CheckUserResponseData>(ApiUrl.ValidateUser, { username })
      .pipe(catchError((error: any) => throwError(error)));
  }

  submitForm(data: object): Observable<SubmitFormResponseData> {
    return this.http
      .post<SubmitFormResponseData>(ApiUrl.SubmitForm, data)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
