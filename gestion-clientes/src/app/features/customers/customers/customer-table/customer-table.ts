import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../../models/customer.model';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.css'
})
export class CustomerTableComponent {

  @Input() customers: Customer[] = [];

  @Output() edit = new EventEmitter<Customer>();
  @Output() delete = new EventEmitter<number>();

  onEdit(customer: Customer): void {
    this.edit.emit(customer);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}