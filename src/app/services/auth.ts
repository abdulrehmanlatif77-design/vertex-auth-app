import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private http = inject(HttpClient);
  // Use dev proxy (/api) to avoid CORS and preflight
  private apiUrl = '/api/v1/Auth/login';

  constructor() {
    // Check if token exists in localStorage on service initialization (only in browser)
    if (this.isBrowser) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.isLoggedIn.set(true);
      }
    }
  }

  async login(username: string, password: string): Promise<string> {
    try {
      const body = {
        email: username,
        password: password
      };

      const response = await firstValueFrom(
        this.http.post<any>(this.apiUrl, body)
      );

      // Try common token property names
      const token =
        response?.token ||
        response?.accessToken ||
        response?.jwt ||
        response?.idToken ||
        response?.data?.token;

      if (!token) {
        throw new Error('Login succeeded but token was not found in response');
      }

      if (this.isBrowser) {
        localStorage.setItem('auth_token', token);
      }
      this.isLoggedIn.set(true);
      return token;
    } catch (err: any) {
      const message = err?.error?.message || err?.message || 'Login failed';
      throw message;
    }
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
