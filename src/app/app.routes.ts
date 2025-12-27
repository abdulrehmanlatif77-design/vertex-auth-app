import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { HomeComponent } from './components/home/home';
import { authGuard } from './guards/auth-guard';
import { LayoutComponent } from './components/layout/layout';

export const routes: Routes = [
  // Public route without layout
  { path: 'login', component: LoginComponent },

  // Private shell with layout
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
