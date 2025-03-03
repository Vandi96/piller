import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Product } from '@core/interface/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatIcon, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  private _cartService = inject(CartService);
  public product = input.required<Product>();
  public gridMode = input.required<boolean>();

  public addProductToCart(item: Product): void {
    this._cartService.addToCart(item);
  }
}
