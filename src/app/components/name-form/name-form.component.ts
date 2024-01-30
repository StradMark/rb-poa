import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-name-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './name-form.component.html',
  styleUrl: './name-form.component.scss',
})
export class NameFormComponent {
  @Output() submitForm: EventEmitter<{
    surname: string;
  }> = new EventEmitter();

  nameForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(private formBuilder: NonNullableFormBuilder) {}

  get name() {
    return this.nameForm.get('name');
  }

  onSubmit(): void {
    if (this.nameForm.invalid) {
      this.nameForm.markAllAsTouched();
      return;
    }

    this.submitForm.emit({
      surname: this.nameForm.controls.name.value,
    });
  }
}
