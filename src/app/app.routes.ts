import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '',
    redirectTo: 'webshop',
    pathMatch: 'full',
  },
  {
    path: 'webshop',
    loadComponent: () => import('./features/webshop/pages/webshop-page/webshop-page.component').then(m => m.WebshopPageComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./features/webshop/components/product-list/product-list.component').then(m => m.ProductListComponent) 
      },
      { 
        path: 'checkout', 
        loadComponent: () => import('./features/webshop/components/checkout/checkout.component').then(m => m.CheckoutComponent) 
      }
    ],
  },
  { path: '**', redirectTo: 'webshop' }
];
