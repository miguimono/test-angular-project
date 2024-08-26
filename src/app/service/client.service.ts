// src/app/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:8090/clients';

  constructor(private http: HttpClient) {}

  getClientInfo(documentType: string, documentNumber: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}?documentType=${documentType}&documentNumber=${documentNumber}`
    );
  }
}
