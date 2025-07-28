import { Component, inject } from '@angular/core';
import { SIDENAV } from '../../consts/sidebar.const';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBuildingOffice, heroHome, heroMegaphone } from '@ng-icons/heroicons/outline';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [provideIcons({ heroHome, heroBuildingOffice })]
})
export class SidebarComponent {
  private _sidebarService = inject(SidebarService);

  _showSidebar$ = this._sidebarService._show$;
  nav = SIDENAV;
}
