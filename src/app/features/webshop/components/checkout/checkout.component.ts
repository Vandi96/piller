import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { expiryDateValidator } from '../../utils/expiry-date.validator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Product } from '@core/interface/product.interface';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressSpinner,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private _cartService = inject(CartService);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private _destroyRef = inject(DestroyRef);

  public checkoutForm!: FormGroup;
  public isProcessing = signal<boolean>(false);
  public cartItems = computed(() => this._cartService.getCart());
  public isCartEmpty = computed(() => this.cartItems().length === 0);
  public totalPrice = computed(() =>
    this._cartService.getCart().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  constructor() {
    effect(() => {
      if (this.isCartEmpty()) {
        this.checkoutForm.disable();
        this._router.navigate(['/webshop'])
        this._snackBar.open('Your cart is empty. Browse our products and fill it up!', 'Close', { duration: 3000 });
      }
    });
  }

  public ngOnInit(): void {
    this.checkoutForm = this._fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      billingAddress: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9- ]{10,17}$')]],
      deliveryMethod: ['delivery', [Validators.required]],
      paymentMethod: ['card', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$'), expiryDateValidator()]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      termsAccepted: [false, [Validators.requiredTrue]],
      differentShipping: [false],
      shippingAddress: [''],
    });

    this.checkoutForm.get('differentShipping')?.valueChanges.pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((value: boolean)=> {
      if (value) {
        this.checkoutForm.get('shippingAddress')?.setValidators([Validators.required, Validators.minLength(3)]);
      } else {
        this.checkoutForm.get('shippingAddress')?.clearValidators();
      }
      this.checkoutForm.get('shippingAddress')?.updateValueAndValidity();
    });
  }

  public removeItem(productId: number, removeAll = false): void {
    this._cartService.removeFromCart(productId, removeAll);
  }

  public addItem(item: Product): void {
    this._cartService.addToCart(item);
  }

  public onSubmit(): void {
    this.isProcessing.set(true);
    // Simulated payment process
    setTimeout(() => {
      this._cartService.clearCart();
      this._snackBar.open('Payment successful!', 'Close', { duration: 3000 });
      this._router.navigate(['/'], { queryParams: { success: 'true' } });

      this.isProcessing.set(false);
    }, 2000);
  }
}
