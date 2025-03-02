import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout.component';
import { WebshopHeaderComponent } from '../../components/webshop-header/webshop-header.component';
import { FooterComponent } from "../../../../core/components/footer/footer.component";

@Component({
  selector: 'app-webshop-page',
  imports: [CommonModule, RouterOutlet, MainLayoutComponent, WebshopHeaderComponent, FooterComponent],
  templateUrl: './webshop-page.component.html',
  styleUrl: './webshop-page.component.scss'
})
export class WebshopPageComponent {}
