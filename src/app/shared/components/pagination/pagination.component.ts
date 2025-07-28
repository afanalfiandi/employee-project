import { Component, inject } from '@angular/core';
import { Option } from '../../../core/interfaces/option.interface';
import { ITEMS_PER_PAGE_OPTION } from '../../consts/items-per-page-option.const';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { APP_ICONS } from '../../consts/icons.const';
import { ButtonIconComponent } from "../button-icon/button-icon.component";
import { PaginationService } from './pagination.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [NgIcon, ButtonIconComponent, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  providers: [provideIcons(APP_ICONS)]
})
export class PaginationComponent {
  private _paginationService = inject(PaginationService);

  _pagination$ = this._paginationService._pagination$;
  itemPerPageOpt: Option[] = ITEMS_PER_PAGE_OPTION;

  onChangePage(action: 'next' | 'prev') {
    this._paginationService.onPageChange(action)
  }
}
