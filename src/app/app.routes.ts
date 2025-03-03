import { Routes } from '@angular/router';
import { canActivateIfCartNotEmptyGuard } from './features/webshop/guards/can-activate-if-cart-not-empty.guard';

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
        loadComponent: () => import('./features/webshop/components/checkout/checkout.component').then(m => m.CheckoutComponent), 
        canActivate: [canActivateIfCartNotEmptyGuard]
      }
    ],
  },
  {
    path: 'weather-forecast',
    loadComponent: () => import('./features/weather/pages/weather-page/weather-page.component').then(m => m.WeatherPageComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./features/weather/components/weather-list/weather-list.component').then(m => m.WeatherListComponent) 
      },
    ],
  },
  { path: '**', redirectTo: 'webshop' }
];
