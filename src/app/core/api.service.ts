import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  // POST con body
  sendNaturalLanguageQuery(question: string) {
    return this.http.post(`${this.baseUrl}/query/convert`, { question });
  }

  getTables() {
    return this.http.get<string[]>(`${this.baseUrl}/meta/tables`);
}

  // POST para subir archivos
  uploadFile(tabla: string, archivo: File) {
    const formData = new FormData();
    formData.append('tabla', tabla);
    formData.append('file', archivo);
    return this.http.post(`${this.baseUrl}/upload/importar`, formData);
  }

  consultarEnLenguajeNatural(pregunta: string, nombreReporte: string) {
    return this.http.post<any>(`${this.baseUrl}/query/convert`, { 
      question: pregunta,
      nombre_reporte: nombreReporte
   });
  }

  getReportesConResultado() {
    return this.http.get<any[]>(`${this.baseUrl}/reportes/resultados`);
  }

  getEtlReportes() {
    return this.http.get<any[]>(`${this.baseUrl}/etl/reportes`);
  }


}
