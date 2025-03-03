import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from "../../components/sidenav/sidenav.component";
import { SidenavService } from '@core/services/sidenav.service';

@Component({
  selector: 'main-layout',
  imports: [CommonModule, MatSidenavModule, SidenavComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private _sidenavService = inject(SidenavService);
  public isSidenavOpen = computed(() => this._sidenavService.getSidenavState());

  public onSidenavClosed(): void {
    this._sidenavService.close();
  }
}
