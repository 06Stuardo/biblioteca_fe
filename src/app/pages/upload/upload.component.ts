import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';

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
  previewData: any[] = [];

  constructor(private api: ApiService) {
    this.api.getTables().subscribe(tablas => {
      this.tablas = tablas;
    });
  }

  handleArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivo = input?.files?.[0] || null;
    this.previewData = [];

    if (this.archivo) {
      const extension = this.archivo.name.split('.').pop()?.toLowerCase();
      const reader = new FileReader();

      reader.onload = () => {
        const contenido = reader.result;

        if (extension === 'csv' && typeof contenido === 'string') {
          Papa.parse(contenido, {
            header: true,
            skipEmptyLines: true,
            complete: result => {
              this.previewData = result.data;
            }
          });
        }

        if ((extension === 'xlsx' || extension === 'xls') && contenido instanceof ArrayBuffer) {
          const workbook = XLSX.read(contenido, { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          let rawData = XLSX.utils.sheet_to_json(sheet, { defval: '' });

          // Filtrar columnas "__EMPTY", "__EMPTY_1", etc.
          this.previewData = rawData.map((row: any) => {
            const cleanRow: any = {};
            Object.keys(row).forEach(key => {
              if (!key.startsWith('__EMPTY')) {
                cleanRow[key] = row[key];
              }
            });
            return cleanRow;
          });
        }
      };

      if (extension === 'csv') {
        reader.readAsText(this.archivo);
      } else {
        reader.readAsArrayBuffer(this.archivo);
      }
    }
  }
  subirArchivo() {
    this.mensaje = '';
    this.error = '';

    if (!this.tablaSeleccionada || !this.archivo) {
      this.error = 'Debe seleccionar una tabla y un archivo.';
      return;
    }

    this.api.uploadFile(this.tablaSeleccionada, this.archivo).subscribe({
      next: (res: any) => {
        this.mensaje = res.mensaje || 'Archivo subido correctamente.';
      },
      error: () => {
        this.error = 'Error al subir el archivo.';
      }
    });
  }

}
