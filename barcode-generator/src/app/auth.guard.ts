import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Importe seu AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated(); // Método que verifica se o usuário está autenticado

    if (!isAuthenticated) {
      // Se não estiver autenticado, redirecione para a página de login
      this.router.navigate(['/login']);
    }

    return isAuthenticated; // Retorna true se estiver autenticado, caso contrário retorna false
  }
}


