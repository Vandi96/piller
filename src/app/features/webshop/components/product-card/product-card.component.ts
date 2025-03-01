import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Product } from '@core/interface/product.interface';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  public product = input.required<Product>();
}
