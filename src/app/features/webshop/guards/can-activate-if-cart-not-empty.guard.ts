import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

export const canActivateIfCartNotEmptyGuard: CanActivateFn = (): boolean => {
  const cartService = inject(CartService);
  const router = inject(Router);
  
  const allowed = cartService.getCartLength() > 0;

  if(!allowed) {
    router.navigate(['/webshop']);
  }

  return allowed;
};
