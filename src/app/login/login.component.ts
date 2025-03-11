import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Autenticação simulada
    if (this.email === 'admin@example.com' && this.password === '123456') {
      // Simulação de autenticação bem-sucedida
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciais inválidas!');
    }
  }
}
