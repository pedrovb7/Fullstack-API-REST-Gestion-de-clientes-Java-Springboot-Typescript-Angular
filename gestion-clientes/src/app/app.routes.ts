import { Routes } from '@angular/router';
import { CustomersComponent } from './features/customers/customers';
import { DashboardComponent } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clientes', component: CustomersComponent }
];