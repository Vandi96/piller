import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout.component';
import { WebshopHeaderComponent } from 'src/app/features/webshop/components/webshop-header/webshop-header.component';

@Component({
  selector: 'app-weather-page',
  imports: [CommonModule, RouterOutlet, MainLayoutComponent, WebshopHeaderComponent],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.scss'
})
export class WeatherPageComponent {}
