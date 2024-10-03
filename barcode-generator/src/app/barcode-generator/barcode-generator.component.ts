import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import JsBarcode from 'jsbarcode'; // Certifique-se de ter a biblioteca instalada
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barcode-generator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './barcode-generator.component.html',
  styleUrl: './barcode-generator.component.scss'
})
export class BarcodeGeneratorComponent {
  barcodeValue: string = ''; // Valor do código de barras
  generatedBarcode: string | null = null; // Código de barras gerado

  generateBarcode() {
    if (this.barcodeValue) {
      this.generatedBarcode = this.barcodeValue; // Armazena o valor do código de barras
      // Aqui você pode gerar o código de barras visualmente usando a biblioteca JsBarcode
      JsBarcode('#barcode', this.barcodeValue, {
        format: 'EAN13', // Formato do código de barras
        width: 2,
        height: 100,
        displayValue: true,
      });
    }
  }
}
