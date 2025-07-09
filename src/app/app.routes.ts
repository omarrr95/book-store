import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './guards/auth.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/components/home/home.component').then(m => m.HomeComponent),
          },
          {
            path: 'home',
            loadComponent: () =>
              import('./pages/components/home/home.component').then(m => m.HomeComponent),
          },
        ]
      },
      {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import('./auth/components/login/login.component').then(m => m.LoginComponent),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./auth/components/register/register.component').then(m => m.RegisterComponent),
          },
          {
            path: 'reset-password',
            loadComponent: () =>
              import('./auth/components/resetpassword/resetpassword.component').then(m => m.ResetpasswordComponent),
          },
          {
            path: 'forget-password',
            loadComponent: () =>
              import('./auth/components/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent),
          },
          {
            path: 'change-password',
            loadComponent: () =>
              import('./auth/components/changepassword/changepassword.component').then(m => m.ChangepasswordComponent),canActivate:[authGuard],
          }
        ]
      },
       {
        path: 'admin',
        component: DashboardLayoutComponent,
        
        children: [
          {
            path: 'categories',
            loadComponent: () =>
              import('./admin/components/categories/list/list.component').then(m => m.ListComponent),canActivate:[authGuard] 
          },
          {
            path: 'categories/add',
            loadComponent: () =>
              import('./admin/components/categories/form/form.component').then(m => m.FormComponent),canActivate:[authGuard] 
          },
            {
            path: 'categories/edit/:id',
            loadComponent: () =>
              import('./admin/components/categories/form/form.component').then(m => m.FormComponent),canActivate:[authGuard] 
          },
                {
            path: 'books',
            loadComponent: () =>
              import('./admin/components/books/list/list.component').then(m => m.ListComponent),canActivate:[authGuard] 
          },
          {
            path: 'books/add',
            loadComponent: () =>
              import('./admin/components/books/form/form.component').then(m => m.FormComponent),canActivate:[authGuard] 
          },
            {
            path: 'books/edit/:id',
            loadComponent: () =>
              import('./admin/components/books/form/form.component').then(m => m.FormComponent),canActivate:[authGuard] 
          }
        ]
      },
      { path: '**', redirectTo: '' }
    ];
