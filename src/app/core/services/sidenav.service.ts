import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private _sidenavOpen = signal<boolean>(false);

  public toggle(): void {
    this._sidenavOpen.set(!this._sidenavOpen());
  }

  public getSidenavState(): boolean {
    return this._sidenavOpen();
  }
  
  public close(): void {
    this._sidenavOpen.set(false);
  }
}
