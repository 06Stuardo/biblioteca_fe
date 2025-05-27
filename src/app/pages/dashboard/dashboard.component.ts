import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { AuthService } from '../../core/auth.service';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private auth: AuthService, private api : ApiService){}

  reportes: any[] = [];

  ngOnInit() {
    this.api.getReportesConResultado().subscribe({
      next: (res) => this.reportes = res,
      error: () => this.reportes = [{ nombre: 'Error al cargar', error: 'No se pudo obtener la información' }]
    });
  }

  logout() {
    this.auth.logout();
  }

  public barChartType: ChartType = 'bar';

  public barChartData = {
    labels: ['Enero', 'Febrero', 'Marzo'],
    datasets: [
      {
        label: 'Consultas realizadas',
        data: [65, 59, 80],
        backgroundColor: ['#2563eb', '#3b82f6', '#60a5fa'],
        borderRadius: 8
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#1e3a8a',
          font: { size: 14 }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#1e40af' },
        grid: { color: '#e0e7ff' }
      },
      y: {
        ticks: { color: '#1e40af' },
        grid: { color: '#e0e7ff' }
      }
    }
  };

}
