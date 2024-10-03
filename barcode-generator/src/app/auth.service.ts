import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedStatus = false; // Status de autenticação

  // Definindo o super usuário com credenciais do environment
  private superUser = {
    username: environment.SUPERUSER_USERNAME, // Pega do arquivo de ambiente
    password: CryptoJS.SHA256(environment.SUPERUSER_PASSWORD).toString() // Hash da senha
  };

  // Função de autenticação que compara as credenciais inseridas com as armazenadas
  authenticate(username: string, password: string): boolean {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const isAuthenticated = username === this.superUser.username && hashedPassword === this.superUser.password;
    this.isAuthenticatedStatus = isAuthenticated; // Atualiza o status de autenticação
    return isAuthenticated;
  }

  // Função para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.isAuthenticatedStatus; // Retorna o status de autenticação
  }
}


