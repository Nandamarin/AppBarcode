import { Component } from '@angular/core';
import JsBarcode from 'jsbarcode'; // Certifique-se de ter a biblioteca instalada
import jsPDF from 'jspdf'; // Biblioteca para gerar PDFs
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barcode-generator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './barcode-generator.component.html',
  styleUrl: './barcode-generator.component.scss'
})
export class BarcodeGeneratorComponent {
  generatedBarcode: string | null = null; // Código de barras gerado
  barcodeImageData: string = ''; // Dados da imagem do código de barras

  // Gera o código de barras EAN-13 aleatório
  generateBarcode(): void {
    const randomBarcode = this.generateEAN13();
    this.generatedBarcode = randomBarcode;

    // Aguarda o SVG ser criado no DOM antes de gerar o código de barras
    setTimeout(() => {
      const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      JsBarcode(svgElement, randomBarcode, {
        format: 'EAN13',
        width: 2,
        height: 120,
        displayValue: true,
      });
      this.barcodeImageData = svgElement.outerHTML;

      // Centraliza o texto do valor do código de barras
      const textElement = svgElement.querySelector('text');
      if (textElement) {
        textElement.setAttribute('text-anchor', 'middle'); // Centraliza o texto horizontalmente
        textElement.setAttribute('x', '100%'); // Ajusta a posição X para 50% da largura do SVG
      }

      // Exibe o código de barras na tela
      const barcodeElement = document.getElementById('barcode');
      if (barcodeElement) {
        barcodeElement.innerHTML = '';
        barcodeElement.appendChild(svgElement); // Insere o SVG no elemento
      }
    }, 0);
  }

  // Função para gerar um código EAN-13 aleatório
  generateEAN13(): string {
    const prefix = '789'; // Prefixo padrão para produtos alimentícios no Brasil
    const randomDigits = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    const withoutCheckDigit = prefix + randomDigits;
    const checkDigit = this.calculateCheckDigit(withoutCheckDigit);
    return withoutCheckDigit + checkDigit;
  }

  // Cálculo do dígito verificador do EAN-13
  calculateCheckDigit(barcode: string): number {
    let sum = 0;
    for (let i = 0; i < barcode.length; i++) {
      const digit = parseInt(barcode[i], 10);
      sum += (i % 2 === 0) ? digit : digit * 3;
    }
    return (10 - (sum % 10)) % 10;
  }

  // Função para baixar o código de barras gerado como PDF
  downloadBarcode(): void {
    const svgElement = document.getElementById('barcode')?.querySelector('svg');
    if (!svgElement) {
      alert('Gere um código de barras primeiro.');
      return;
    }

    // Converte o SVG em uma imagem base64
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      // Converte o canvas para uma imagem base64
      const pngDataUrl = canvas.toDataURL('image/png');

      // Cria o PDF com jsPDF e adiciona o código de barras
      const doc = new jsPDF();
      doc.text('Código de Barras EAN-13 Gerado', 10, 10);
      doc.addImage(pngDataUrl, 'PNG', 10, 20, 180, 50); // Adiciona a imagem do código de barras
      doc.text('Valor: ' + this.generatedBarcode, 10, 80);
      doc.save('barcode.pdf');
    };

    img.src = url;
  }
}



