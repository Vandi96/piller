import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GeoLocation } from '@core/interface/geo.interface';
import { WeatherResponse } from '@core/interface/weather.interface';
import { WeatherApiService } from '@core/services/weather-api.service';
import { catchError, distinctUntilChanged, exhaustMap, filter, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-weather-list',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.scss'
})
export class WeatherListComponent implements OnInit {
  private _service = inject(WeatherApiService);
  public cityName = new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]+$/)]);
  public searchCity = signal<string>('');
  public searchCity$ = toObservable(this.searchCity);
  public cityWeatherData$: Observable<WeatherResponse | null> | undefined;
  public errorMessage = signal<string | null>(null); 
  public displayedCityName = signal<string>('');

  public ngOnInit(): void {
    this.cityWeatherData$ = this.searchCity$.pipe(
      map((city: string) => city!.trim()),
      distinctUntilChanged(),
      filter((city: string) => city.length > 1),
      exhaustMap((city: string) => {
        return this._service.getCityCoordinates(city).pipe(
          switchMap((geoLocation: GeoLocation[]) => {
            if (!geoLocation.length) {
              this.errorMessage.set('City not found. Try again.');
              return of(null);
            }
            this.displayedCityName.set(city);
            this.errorMessage.set(null);
            return this._service.getWeather(geoLocation[0].lat, geoLocation[0].lon);
          }),
          catchError(() => {
            this.errorMessage.set('An error occurred while fetching weather data.');
            return of(null);
          })
        )
      }),
    );
  }

  public searchWeather(): void {
    if (this.cityName.value) {
      this.searchCity.set(this.cityName.value);
    }
  }
}
