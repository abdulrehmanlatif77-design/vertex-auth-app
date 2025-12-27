import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { StudentComponent } from './components/student/student';
import { authGuard } from './guards/auth-guard';
import { LayoutComponent } from './components/layout/layout';

export const routes: Routes = [
  // Default redirect to home or login based on auth
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Public route without layout
  { path: 'login', component: LoginComponent },

  // Private shell with layout
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: StudentComponent }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
