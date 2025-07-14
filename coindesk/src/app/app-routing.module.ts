import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './currency/currency.component';

const routes: Routes = [
  { path: 'currency', component: CurrencyComponent },
  { path: '', redirectTo: '/currency', pathMatch: 'full' }, // 預設導向 currency，可選
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
