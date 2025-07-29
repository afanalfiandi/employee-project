import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../shared/components/breadcrumbs/breadcrumbs.service';
import { BaseComponent } from '../../core/components/base.component';
import { Breadcrumb } from '../../shared/components/breadcrumbs/breadcrumbs.interface';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent extends BaseComponent implements OnInit {
  // Inject the breadcrumbs service to manage breadcrumb navigation
  private _breadcrumbService = inject(BreadcrumbsService);

  // Lifecycle hook called after component is initialized
  ngOnInit(): void {
    this.setBreadcrumb();
  }

  // Set a single breadcrumb for the dashboard page
  setBreadcrumb() {
    const breadcrumbs: Breadcrumb[] = [
      {
        label: 'Dashboard',
        path: '/dashboard'
      }
    ];
    this._breadcrumbService.set(breadcrumbs)
  }
}
