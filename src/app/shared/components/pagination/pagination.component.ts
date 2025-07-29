import { Component, inject } from '@angular/core';
import { Option } from '../../../core/interfaces/option.interface';
import { ITEMS_PER_PAGE_OPTION } from '../../consts/items-per-page-option.const';
import { ButtonIconComponent } from "../button-icon/button-icon.component";
import { PaginationService } from './pagination.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [ButtonIconComponent, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  // Inject necessary service
  private _paginationService = inject(PaginationService);

  // Observable to store pagination data from service
  _pagination$ = this._paginationService._pagination$;
  // Store option data
  itemPerPageOpt: Option[] = ITEMS_PER_PAGE_OPTION;

  /* Method to paginate with 2 parameter (next or prev) */
  onChangePage(action: 'next' | 'prev') {
    this._paginationService.onPageChange(action)
  }

  // Method to trigger display per page value
  onPerPageChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this._paginationService.onPerPageChange(+value);
  }
}
