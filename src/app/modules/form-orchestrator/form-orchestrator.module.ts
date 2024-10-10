import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormContainerComponent,
  FormListComponent,
  FormListItemComponent,
} from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageDirective } from './directives';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    FormContainerComponent,
    FormListComponent,
    FormListItemComponent,
    ValidationMessageDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [FormContainerComponent],
})
export class FormOrchestratorModule {}
