import { Observable } from 'rxjs';
import {CheckUserResponseData, SubmitFormResponseData} from '../../shared/interface/responses';

export abstract class ApiAbstractAdapter {
  abstract validateUser(username: string): Observable<CheckUserResponseData>;

  abstract submitForm(data: object): Observable<SubmitFormResponseData>;
}
