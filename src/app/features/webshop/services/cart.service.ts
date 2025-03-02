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
    const cartItems = this._cart();
    const existingItem = cartItems.find(item => item.product.id === product.id);
    console.log(existingItem);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ product, quantity });
    }
    this._cart.set([...cartItems]);
  }

  public removeFromCart(productId: number, removeAll: boolean = false): void {
    let cartItems = this._cart();
    const existingItem = cartItems.find(item => item.product.id === productId);

    if (existingItem) {
      if (removeAll || existingItem.quantity === 1) {
        cartItems = cartItems.filter(item => item.product.id !== productId);
      } else {
        existingItem.quantity--;
      }
      this._cart.set([...cartItems]);
    }
  }

  public clearCart(): void {
    this._cart.set([]);
  }
}
