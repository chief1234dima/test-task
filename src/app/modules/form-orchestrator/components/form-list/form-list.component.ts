import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'tt-form-list',
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss',
})
export class FormListComponent {
  @Input() formId: FormGroup;
  @Input() list: FormArray;
  @Output() removeForm = new EventEmitter<number>();
}
