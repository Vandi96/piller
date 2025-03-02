import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-webshop-header',
  imports: [CommonModule, MatIcon, MatButtonModule, MatBadgeModule, RouterModule],
  templateUrl: './webshop-header.component.html',
  styleUrl: './webshop-header.component.scss'
})
export class WebshopHeaderComponent {
  private _cartService = inject(CartService);

  public get cartLength(): number {
    return this._cartService.getCartLength();
  }

  public cartIsEmpty(): boolean {
    return this.cartLength === 0;
  }
}
