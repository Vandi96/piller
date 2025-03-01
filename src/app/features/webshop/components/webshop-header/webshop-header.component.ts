import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-webshop-header',
  imports: [CommonModule, MatIcon, MatButtonModule, MatBadgeModule],
  templateUrl: './webshop-header.component.html',
  styleUrl: './webshop-header.component.scss'
})
export class WebshopHeaderComponent {

}
