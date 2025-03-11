import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule]
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = 'USER';

  constructor(private router: Router) {}

  onSubmit() {
    // Simulação de registro de usuário
    console.log('Usuário registrado com sucesso:', {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    });
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  }
}
