import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckUserResponseData } from './shared/interface/responses';

@Component({
  selector: 'app-root',
  template: '<tt-form-container></tt-form-container>',
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  // just an example, you are free to move it anywhere
  checkUser(username: string): Observable<CheckUserResponseData> {
    return this.http.post<CheckUserResponseData>('/api/checkUsername1', {
      username,
    });
  }
}
