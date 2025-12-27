import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).then(
      (token: string) => {
        this.isLoading = false;
        // Use setTimeout to ensure signal update is processed before navigation
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 0);
      },
      (error: string) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    );
  }
}
