import { Component } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-etl-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, NgChartsModule],
  templateUrl: './etl-reports.component.html',
  styleUrl: './etl-reports.component.scss'
})
export class EtlReportsComponent {

    reportes: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getEtlReportes().subscribe({
      next: (res) => this.reportes = res,
      error: () => {
        this.reportes = [
          { nombre: 'Error al cargar', error: 'No se pudieron obtener los reportes' }
        ];
      }
    });
  }

}
