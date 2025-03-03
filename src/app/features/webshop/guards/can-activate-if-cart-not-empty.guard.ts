import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const canActivateIfCartNotEmptyGuard: CanActivateFn = (): boolean => {
  const cartService = inject(CartService);
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);
  
  const allowed = cartService.getCartLength() > 0;

  if(!allowed) {
    router.navigate(['/webshop']);
    snackbar.open('You cannot proceed to checkout because your cart is empty.', 'Close', { duration: 3000 });
  }

  return allowed;
};
