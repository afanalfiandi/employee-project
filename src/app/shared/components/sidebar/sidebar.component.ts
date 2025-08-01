import { Component, inject } from '@angular/core';
import { SIDENAV } from '../../consts/sidebar.const';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBuildingOffice, heroHome, heroUser } from '@ng-icons/heroicons/outline';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { CommonModule } from '@angular/common';
import { APP_ICONS } from '../../consts/icons.const';
import { AuthService } from 'app/pages/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [provideIcons(APP_ICONS)]
})
export class SidebarComponent {
  // inject service
  private _sidebarService = inject(SidebarService);
  private _authService = inject(AuthService);

  // Observable to store sidebar status from service
  _showSidebar$ = this._sidebarService._show$;
  // nav const data
  nav = SIDENAV;

  // logout method integrated with auth service
  onLogout() {
    this._authService.logout();
  }
}
