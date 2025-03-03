import { Injectable, signal } from '@angular/core';
import { Product, ProductWithQuantity } from '@core/interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart = signal<ProductWithQuantity[]>([]);

  public getCart(): ProductWithQuantity[] {
    return this._cart();
  }

  public getCartLength(): number {
    return this._cart().reduce((total, item) => total + item.quantity, 0);
  }

  public addToCart(product: Product, quantity: number = 1): void {
    const cartItems = [...this._cart()]; 
    const existingIndex = cartItems.findIndex(item => item.product.id === product.id);

    if (existingIndex !== -1) {
      cartItems[existingIndex] = {
        ...cartItems[existingIndex],
        quantity: cartItems[existingIndex].quantity + quantity
      };
    } else {
      cartItems.push({ product, quantity });
    }

    this._cart.set(cartItems);
  }

  public removeFromCart(productId: number, removeAll: boolean = false): void {
    let cartItems = [...this._cart()];
    const existingIndex = cartItems.findIndex(item => item.product.id === productId);

    if (existingIndex !== -1) {
      if (removeAll || cartItems[existingIndex].quantity === 1) {
        cartItems = cartItems.filter(item => item.product.id !== productId);
      } else {
        cartItems[existingIndex] = {
          ...cartItems[existingIndex],
          quantity: cartItems[existingIndex].quantity - 1
        };
      }
      this._cart.set(cartItems);
    }
  }

  public clearCart(): void {
    this._cart.set([]);
  }
}
