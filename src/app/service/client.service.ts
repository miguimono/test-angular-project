import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:8090/clients';

  constructor(private http: HttpClient) {}

  getClientInfo(documentType: string, documentNumber: string): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}?documentType=${documentType}&documentNumber=${documentNumber}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage =
            'Solicitud incorrecta (400). Verifique los datos enviados.';
          break;
        case 404:
          errorMessage = 'Cliente no encontrado (404).';
          break;
        case 500:
          errorMessage =
            'Error en el servidor (500). Intente de nuevo más tarde.';
          break;
        default:
          errorMessage = `Error inesperado: ${error.status}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
