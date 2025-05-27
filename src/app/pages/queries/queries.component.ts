import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-queries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './queries.component.html',
  styleUrl: './queries.component.scss'
})
export class QueriesComponent {

  pregunta: string = '';
  resultados: any[] = [];
  columnas: string[] = [];
  error: string = '';
  sql: string = '';
  paginaActual: number = 1;
  filasPorPagina: number = 5;
  nombreReporte: string = '';

  constructor(private api: ApiService) {}

  get resultadosPaginados() {
    const inicio = (this.paginaActual - 1) * this.filasPorPagina;
    return this.resultados.slice(inicio, inicio + this.filasPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.resultados.length / this.filasPorPagina);
  }

  cambiarPagina(nueva: number) {
    if (nueva >= 1 && nueva <= this.totalPaginas) {
      this.paginaActual = nueva;
    }
  }

  realizarConsulta() {
        this.error = '';
    this.sql = '';
    this.resultados = [];
    this.columnas = [];

    if (!this.pregunta.trim()) {
      this.error = 'Por favor ingresa una consulta.';
      return;
    }

    this.api.consultarEnLenguajeNatural(this.pregunta, this.nombreReporte).subscribe({
      next: (res) => {
        this.sql = res.sql;
        if (res.data?.length) {
          this.resultados = res.data;
          this.columnas = Object.keys(res.data[0]);
        } else {
          this.error = 'No se encontraron resultados.';
        }
      },
      error: () => {
        this.error = 'Ocurrió un error al procesar la consulta.';
      }
    });
  }

}
