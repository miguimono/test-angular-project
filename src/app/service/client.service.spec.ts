// src/app/client.service.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService],
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve client data successfully', () => {
    const mockResponse = {
      type: 'C',
      documentNumber: '23445322',
      firstName: 'Juan',
      secondName: 'Carlos',
      firstSurname: 'Pérez',
      secondSurname: 'Gómez',
      phone: '555-1234',
      address: 'Calle Falsa 123',
      city: 'Bogotá',
    };

    service.getClientInfo('C', '23445322').subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'http://localhost:8090/clients?documentType=C&documentNumber=23445322'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle 404 error', () => {
    service.getClientInfo('C', '23445322').subscribe({
      next: () => fail('should have failed with a 404 error'),
      error: (error) => {
        expect(error.message).toContain('Cliente no encontrado (404)');
      },
    });

    const req = httpMock.expectOne(
      'http://localhost:8090/clients?documentType=C&documentNumber=23445322'
    );
    req.flush('Error', { status: 404, statusText: 'Not Found' });
  });

  it('should handle 500 error', () => {
    service.getClientInfo('C', '23445322').subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error) => {
        expect(error.message).toContain('Error en el servidor (500)');
      },
    });

    const req = httpMock.expectOne(
      'http://localhost:8090/clients?documentType=C&documentNumber=23445322'
    );
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
