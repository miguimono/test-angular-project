import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss'],
})
export class ClientSearchComponent {
  //   clientForm: FormGroup;

  //   constructor(private fb: FormBuilder, private router: Router) {
  //     this.clientForm = this.fb.group({
  //       documentType: ['', Validators.required],
  //       documentNumber: [
  //         '',
  //         [
  //           Validators.required,
  //           Validators.minLength(8),
  //           Validators.maxLength(11),
  //           Validators.pattern(/^\d+$/),
  //         ],
  //       ],
  //     });
  //   }

  //   formatNumber(event: any) {
  //     let inputValue = event.target.value.replace(/\D/g, '');
  //     inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //     this.clientForm
  //       .get('documentNumber')
  //       ?.setValue(inputValue, { emitEvent: false });
  //   }

  //   onSearch() {
  //     if (this.clientForm.valid) {
  //       const { documentType, documentNumber } = this.clientForm.value;
  //       // Aquí debería ir la lógica para consumir el servicio si es necesario
  //       this.router.navigate(['/summary'], {
  //         state: { documentType, documentNumber },
  //       });
  //     }
  //   }
  // }

  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.clientForm = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(11),
          Validators.pattern('^[0-9,]*$'),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const { documentType, documentNumber } = this.clientForm.value;
      this.clientService
        .getClientInfo(documentType, documentNumber)
        .subscribe((data) => {
          this.router.navigate(['/summary'], { state: data });
        });
    }
  }
}
