import { Component, inject } from '@angular/core';
import { BreadcrumbsService } from './breadcrumbs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
  /* Inject the BreadcrumbsService to access breadcrumb state */
  private _breadcrumbService = inject(BreadcrumbsService);

  /* Observable that holds the current breadcrumbs list */
  _breadCrumbs$ = this._breadcrumbService._breadcrumbs$;
}
