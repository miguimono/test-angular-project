import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSearchComponent } from './components/client-search/client-search.component';
import { ClientSummaryComponent } from './components/client-summary/client-summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: ClientSearchComponent },
  { path: 'summary', component: ClientSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
