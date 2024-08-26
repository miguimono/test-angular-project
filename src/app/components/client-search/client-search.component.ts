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
  clientForm: FormGroup;
  errorMessage: string | null = null;

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
      this.clientService.getClientInfo(documentType, documentNumber).subscribe({
        next: (data) => {
          this.router.navigate(['/summary'], { state: data });
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
    }
  }
}
