import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import { Customer } from '../../models/customer.model';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:8080/sistema/api/v1/clientes';

  const mockCustomers: Customer[] = [
    { id: 1, name: 'Pedro', username: 'pedro', password: '1234', city: 'Madrid' },
    { id: 2, name: 'Ana', username: 'ana', password: '5678', city: 'Barcelona' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all customers', () => {
    service.getAll().subscribe(customers => {
      expect(customers.length).toBe(2);
      expect(customers).toEqual(mockCustomers);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
  });

  it('should create a customer', () => {
    const newCustomer: Customer = { id: 3, name: 'Luis', username: 'luis', password: '0000', city: 'Barcelona' };

    service.create(newCustomer).subscribe(customer => {
      expect(customer).toEqual(newCustomer);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCustomer);
    req.flush(newCustomer);
  });

  it('should update a customer', () => {
    const updatedCustomer: Customer = { id: 1, name: 'Pedro Actualizado', username: 'pedro', password: '1234', city: 'Madrid' };

    service.update(updatedCustomer).subscribe(() => {
      expect(true).toBe(true);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCustomer);
    req.flush(null);
  });

  it('should delete a customer', () => {
    service.delete(1).subscribe(customer => {
      expect(customer).toEqual(mockCustomers[0]);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockCustomers[0]);
  });
});