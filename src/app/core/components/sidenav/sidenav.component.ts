import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SidenavService } from '@core/services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, MatButtonModule, MatIcon],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  private _sidenavService = inject(SidenavService);
  private _router = inject(Router);

  public close(): void {
    this._sidenavService.close();
  }

  public navigate(url: string): void {
    this._router.navigate([`/${url}`]);
    this.close();
  }
}
