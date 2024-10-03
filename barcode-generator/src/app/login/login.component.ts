import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule] // Adicione o FormsModule aqui
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.authService.authenticate(this.username, this.password)) {
      // Redireciona para a página 'barcode-generator' após login bem-sucedido
      this.router.navigate(['/barcode-generator']);
    } else {
      // Exibe mensagem de erro ou trata login inválido
      alert('Usuário ou senha incorretos');
    }
  }
}



