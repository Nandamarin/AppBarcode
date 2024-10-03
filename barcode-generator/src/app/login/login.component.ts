import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const isAuthenticated = this.authService.authenticate(this.username, this.password);
    if (isAuthenticated) {
      this.router.navigate(['/barcode-generator']);
    } else {
      alert('Usuário ou senha incorretos');
    }
  }

  register() {
    this.authService.register(this.username, this.password);
    alert('Usuário registrado com sucesso!');
  }
}


