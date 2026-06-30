import { Component, OnInit, ElementRef, ViewChild, signal } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../models/customer.model';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  @ViewChild('barChart') barChartRef!: ElementRef;

  totalCustomers = signal(0);

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAll().subscribe(customers => {
      this.totalCustomers.set(customers.length);
      this.buildChart(customers);
    });
  }

  buildChart(customers: Customer[]): void {
    const cityCounts: { [key: string]: number } = {};

    customers.forEach(c => {
      const city = c.city || 'Desconocida';
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    const colors = [
      '#89b4fa', '#f38ba8', '#a6e3a1', '#fab387',
      '#cba6f7', '#f9e2af', '#74c7ec', '#eba0ac'
    ];

    const backgroundColors = Object.keys(cityCounts).map(
      (_, index) => colors[index % colors.length]
    );

    new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(cityCounts),
        datasets: [{
          label: 'Clientes por ciudad',
          data: Object.values(cityCounts),
          backgroundColor: backgroundColors,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }
}