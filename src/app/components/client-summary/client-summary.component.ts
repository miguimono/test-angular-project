import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-summary',
  templateUrl: './client-summary.component.html',
  styleUrls: ['./client-summary.component.scss'],
})
export class ClientSummaryComponent {
  client: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.client = navigation?.extras.state;
  }

  goBack(): void {
    this.router.navigate(['/search']);
  }
}
