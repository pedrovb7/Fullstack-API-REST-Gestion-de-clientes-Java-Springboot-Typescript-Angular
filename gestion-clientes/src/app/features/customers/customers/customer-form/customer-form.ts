import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../../models/customer.model';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css'
})
export class CustomerFormComponent implements OnChanges {

  @Input() customer: Customer = { id: 0, name: '', username: '', password: '', city: '' };
  @Input() isEditing = false;

  @Output() save = new EventEmitter<Customer>();
  @Output() cancel = new EventEmitter<void>();

  form: Customer = { id: 0, name: '', username: '', password: '', city: '' };

  ngOnChanges(): void {
    this.form = { ...this.customer };
  }

  onSave(name: NgModel, username: NgModel, password: NgModel, city: NgModel): void {
    name.control.markAsTouched();
    username.control.markAsTouched();
    password.control.markAsTouched();
    city.control.markAsTouched();

    if (name.invalid || username.invalid || password.invalid || city.invalid) {
      return;
    }

    this.save.emit(this.form);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}