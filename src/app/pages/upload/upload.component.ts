import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  tablas: string[] = [];
  tablaSeleccionada: string = '';
  archivo: File | null = null;
  mensaje = '';
  error = '';

  constructor(private api: ApiService) {
    this.api.getTables().subscribe(tablas => {
      this.tablas = tablas;
    });
  }

  handleArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivo = input?.files?.[0] || null;
  }

  subirArchivo() {
    this.mensaje = '';
    this.error = '';

    if (!this.tablaSeleccionada || !this.archivo) {
      this.error = 'Debe seleccionar una tabla y un archivo.';
      return;
    }

    this.api.uploadFile(this.tablaSeleccionada, this.archivo).subscribe({
      next: (res) => {
        this.mensaje = 'Archivo subido correctamente.';
      },
      error: () => {
        this.error = 'Error al subir el archivo.';
      }
    });
  }

}
