import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GeoLocation } from '@core/interface/geo.interface';
import { WeatherResponse } from '@core/interface/weather.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly _geoApiUrl = 'https://nominatim.openstreetmap.org/';
  private readonly _weatherApiUrl = 'https://api.open-meteo.com/v1/forecast';
  private _http = inject(HttpClient);

  public getCityCoordinates(city: string): Observable<GeoLocation[]> { 
    const url = this._geoApiUrl + `search?format=json&q=${city}`;
    return this._http.get<GeoLocation[]>(url);
  }

  public getWeather(latitude: string, longitude: string): Observable<WeatherResponse> {
    return this._http.get<WeatherResponse>(this._weatherApiUrl, {
      params: {
        latitude,
        longitude,
        current: 'temperature_2m,precipitation_probability,windspeed_10m',
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,wind_speed_10m_max,sunrise,sunset',
        timezone: 'auto'
      }
    })
  };
}
