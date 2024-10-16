import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MockBackendInterceptor } from './shared/mock-backend/mock-backend.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormOrchestratorModule } from './modules/form-orchestrator/form-orchestrator.module';
import { ApiAbstractAdapter } from './api/abstract-adapters';
import { ApiAdapter } from './api/adapters';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterOutlet, NgbModule, FormOrchestratorModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockBackendInterceptor,
      multi: true,
    },
    { provide: ApiAbstractAdapter, useClass: ApiAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
