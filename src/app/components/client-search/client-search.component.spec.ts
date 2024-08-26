// src/app/input-form/input-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ClientSearchComponent } from './client-search.component';
import { ClientService } from '../../service/client.service';

describe('ClientSearchComponent', () => {
  let component: ClientSearchComponent;
  let fixture: ComponentFixture<ClientSearchComponent>;
  let clientService: ClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientSearchComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [ClientService],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSearchComponent);
    component = fixture.componentInstance;
    clientService = TestBed.inject(ClientService);
    fixture.detectChanges();
  });
  it('should create the form with two controls', () => {
    expect(component.clientForm.contains('documentType')).toBeTruthy();
    expect(component.clientForm.contains('documentNumber')).toBeTruthy();
  });

  it('should make the documentNumber control required', () => {
    const control = component.clientForm.get('documentNumber');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should submit the form and navigate on success', () => {
    spyOn(clientService, 'getClientInfo').and.returnValue(
      of({
        type: 'C',
        documentNumber: '23445322',
        firstName: 'Juan',
        secondName: 'Carlos',
        firstSurname: 'Pérez',
        secondSurname: 'Gómez',
        phone: '555-1234',
        address: 'Calle Falsa 123',
        city: 'Bogotá',
      })
    );
    spyOn(component['router'], 'navigate');

    component.clientForm.setValue({
      documentType: 'C',
      documentNumber: '23445322',
    });
    component.onSubmit();

    expect(component['router'].navigate).toHaveBeenCalledWith(['/summary'], {
      state: jasmine.any(Object),
    });
  });

  it('should display error message on 404 error', () => {
    spyOn(clientService, 'getClientInfo').and.returnValue(
      throwError(() => new Error('Cliente no encontrado (404)'))
    );

    component.clientForm.setValue({
      documentType: 'C',
      documentNumber: '23445322',
    });
    component.onSubmit();

    expect(component.errorMessage).toBe('Cliente no encontrado (404)');
  });

  it('should display error message on 500 error', () => {
    spyOn(clientService, 'getClientInfo').and.returnValue(
      throwError(() => new Error('Error en el servidor (500)'))
    );

    component.clientForm.setValue({
      documentType: 'C',
      documentNumber: '23445322',
    });
    component.onSubmit();

    expect(component.errorMessage).toBe('Error en el servidor (500)');
  });
});
