import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiAbstractAdapter } from '../abstract-adapters';
import { CheckUserResponseData } from '../../shared/interface/responses';

@Injectable()
export class ApiAdapter implements ApiAbstractAdapter {
  constructor(protected http: HttpClient) {}

  validateUser(username: string): Observable<CheckUserResponseData> {
    const url = '/api/checkUsername';

    return this.http
      .post<CheckUserResponseData>(url, { username })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
