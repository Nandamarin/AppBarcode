import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BarcodeGeneratorComponent } from './barcode-generator/barcode-generator.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Rota padrão
  { path: 'generate-barcode', component: BarcodeGeneratorComponent } // Rota para gerar código de barras
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

