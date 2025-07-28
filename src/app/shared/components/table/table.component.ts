import { Component, Input } from '@angular/core';
import { TitleFormatterPipe } from '../../pipes/title-formatter.pipe';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "../pagination/pagination.component";
import { ButtonIconComponent } from "../button-icon/button-icon.component";

@Component({
  selector: 'app-table',
  imports: [TitleFormatterPipe, CommonModule, PaginationComponent, ButtonIconComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() data!: any[];
  @Input() columns!: string[];

  getRowClass(col: string, row: any): string {
    if (col === 'status') {
      const statusClassMap: Record<string, string> = {
        active: 'bg-blue-100/50 border-blue-900',
        inactive: 'bg-red-100/50 border-red-800',
      };

      const baseClass = 'p-2 border-2';
      const statusClass = statusClassMap[row[col]];

      return statusClass ? `${baseClass} ${statusClass}` : '';
    }

    return '';
  }
}
