import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: { username: string; password: string }[] = []; // Armazena usuários na memória
  private isLoggedIn = false; // Estado de autenticação

  // Método para registrar um novo usuário
  register(username: string, password: string): void {
    this.users.push({ username, password });
  }

  // Método para autenticar o usuário
  authenticate(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.isLoggedIn = true; // O usuário está autenticado
      return true;
    }
    return false; // Usuário não autenticado
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Método para logout
  logout(): void {
    this.isLoggedIn = false;
  }
}

