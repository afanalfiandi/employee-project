import { Component, inject } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private _sidebarService = inject(SidebarService);

  showSidebar() {
    const isSidebarShowed = this._sidebarService._show$.value;
    console.log(isSidebarShowed)
    this._sidebarService.toggle(!isSidebarShowed)
  }
}
