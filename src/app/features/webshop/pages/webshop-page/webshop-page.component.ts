import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout.component';
import { FooterComponent } from "../../../../core/components/footer/footer.component";
import { HeaderComponent } from '@core/components/header/header.component';

@Component({
  selector: 'app-webshop-page',
  imports: [CommonModule, RouterOutlet, MainLayoutComponent, HeaderComponent, FooterComponent],
  templateUrl: './webshop-page.component.html',
  styleUrl: './webshop-page.component.scss'
})
export class WebshopPageComponent {}
