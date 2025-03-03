import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidenavService } from '@core/services/sidenav.service';
import { CartService } from 'src/app/features/webshop/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIcon, MatButtonModule, MatBadgeModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private _cartService = inject(CartService);
  private _route = inject(ActivatedRoute);
  private _sidenavService = inject(SidenavService);

  public get cartLength(): number {
    return this._cartService.getCartLength();
  }

  public cartIsEmpty(): boolean {
    return this.cartLength === 0;
  }

  public isWebshop(): boolean {
    return this._route.snapshot.url.some(segment => segment.path.includes('webshop'));
  }

  public toggle(): void {
    this._sidenavService.toggle();
  }
}
