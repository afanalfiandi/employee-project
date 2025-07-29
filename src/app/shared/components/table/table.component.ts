import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TitleFormatterPipe } from '../../pipes/title-formatter.pipe';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "../pagination/pagination.component";
import { ButtonIconComponent } from "../button-icon/button-icon.component";
import { DateFormatterPipe } from '../../pipes/date-formatter.pipe';

@Component({
  selector: 'app-table',
  imports: [TitleFormatterPipe, CommonModule, PaginationComponent, ButtonIconComponent, DateFormatterPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() data!: any[];
  @Input() columns!: string[];
  @Output() edit = new EventEmitter();

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

  onEdit(row: any) {
    console.log(row)
    this.edit.emit(row);
  }
}
