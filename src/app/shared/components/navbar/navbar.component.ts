import { Component, inject } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthService } from 'app/pages/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  /* Inject service */
  private _sidebarService = inject(SidebarService);
  private _authService = inject(AuthService);

  // show sidebar method based on current value
  showSidebar() {
    const isSidebarShowed = this._sidebarService._show$.value;
    this._sidebarService.toggle(!isSidebarShowed)
  }

  // logout function
  onLogout() {
    this._authService.logout();
  }
}
