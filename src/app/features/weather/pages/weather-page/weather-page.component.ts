import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout.component';
import { FooterComponent } from "../../../../core/components/footer/footer.component";
import { HeaderComponent } from '@core/components/header/header.component';

@Component({
  selector: 'app-weather-page',
  imports: [
    CommonModule, 
    RouterOutlet, 
    MainLayoutComponent, 
    HeaderComponent, 
    FooterComponent
  ],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.scss'
})
export class WeatherPageComponent {}
