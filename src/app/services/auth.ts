import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    // Check if token exists in localStorage on service initialization (only in browser)
    if (this.isBrowser) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.isLoggedIn.set(true);
      }
    }
  }

  login(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'user' && password === 'password') {
          const mockToken = 'mock-jwt-token-' + Date.now();
          if (this.isBrowser) {
            localStorage.setItem('auth_token', mockToken);
          }
          this.isLoggedIn.set(true);
          resolve(mockToken);
        } else {
          reject('Invalid credentials');
        }
      }, 1000);
    });
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('auth_token');
    }
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('auth_token') : null;
  }
}
