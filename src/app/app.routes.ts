import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'queries',
        loadComponent: () =>
          import('./pages/queries/queries.component').then(m => m.QueriesComponent)
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./pages/upload/upload.component').then(m => m.UploadComponent)
      },     
      {
        path: 'etl-report',
        loadComponent: () =>
          import('./pages/etl-reports/etl-reports.component').then(m => m.EtlReportsComponent)
      } 
    ]
  }
];
