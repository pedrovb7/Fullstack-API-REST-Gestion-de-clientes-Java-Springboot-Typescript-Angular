import { Component, OnInit, signal } from '@angular/core';
import { CustomerTableComponent } from './customers/customer-table/customer-table';
import { CustomerFormComponent } from './customers/customer-form/customer-form';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CustomerTableComponent, CustomerFormComponent],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})

export class CustomersComponent implements OnInit {

  customers = signal<Customer[]>([]);
  showForm = signal(false);
  isEditing = false;
  selectedCustomer: Customer = { id: 0, name: '', username: '', password: '', city: '' };

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe(data => {
      this.customers.set(data);
    });
  }

  openCreate(): void {
    this.isEditing = false;
    this.selectedCustomer = { id: 0, name: '', username: '', password: '', city: '' };
    this.showForm.set(true);
  }

  openEdit(customer: Customer): void {
    this.isEditing = true;
    this.selectedCustomer = { ...customer };
    this.showForm.set(true);
  }

  save(customer: Customer): void {
    if (this.isEditing) {
      this.customerService.update(customer).subscribe({
        next: () => {
          this.loadCustomers();
          this.showForm.set(false);
        },
        error: () => {
          alert('Error al actualizar el cliente. Comprueba que el username no esté repetido.');
        }
      });
    } else {
      this.customerService.create(customer).subscribe({
        next: () => {
          this.loadCustomers();
          this.showForm.set(false);
        },
        error: () => {
          alert('El username ya está en uso, elige otro.');
        }
      });
    }
  }

  delete(id: number): void {
    this.customerService.delete(id).subscribe(() => {
      this.loadCustomers();
    });
  }

  cancel(): void {
    this.showForm.set(false);
  }
}