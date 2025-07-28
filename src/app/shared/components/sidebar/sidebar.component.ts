import { Component, inject } from '@angular/core';
import { SIDENAV } from '../../consts/sidebar.const';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBuildingOffice, heroHome, heroUser } from '@ng-icons/heroicons/outline';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { CommonModule } from '@angular/common';
import { APP_ICONS } from '../../consts/icons.const';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [provideIcons(APP_ICONS)]
})
export class SidebarComponent {
  private _sidebarService = inject(SidebarService);

  _showSidebar$ = this._sidebarService._show$;
  nav = SIDENAV;
}
