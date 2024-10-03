import { Observable } from 'rxjs';
import { CheckUserResponseData } from '../../shared/interface/responses';

export abstract class ApiAbstractAdapter {
  abstract validateUser(username: string): Observable<CheckUserResponseData>;
}
