
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor( private api: ApiService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    const credentials = {
      username: this.loginForm.value.email,  // ← renombrado para que coincida
      password: this.loginForm.value.password
    };

    this.api.login(credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.detail || 'Ocurrió un error inesperado.';
      }
    });
  }

}
