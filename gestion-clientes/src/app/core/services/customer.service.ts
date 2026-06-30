import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer.model';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private apiUrl = 'http://localhost:8080/sistema/api/v1/clientes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  create(customer: Customer): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }

  update(customer: Customer): Observable<void> {
    return this.http.put<void>(this.apiUrl, customer);
  }

  delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.apiUrl}/${id}`);
  }
}