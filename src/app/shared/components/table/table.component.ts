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
  // Bind data table
  @Input() data!: any[];
  // Bind data columns
  @Input() columns!: string[];
  // Event emitter for edit feature per row
  @Output() edit = new EventEmitter();
  // Event emitter for delete feature per row
  @Output() delete = new EventEmitter();

  /* 
    This is a method to get row class especially to status columns
  */
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

  // Emits the 'edit' event with one parameter.
  // The parameter is typed as 'any' for flexibility and future-proofing.
  onEdit(row: any) {
    this.edit.emit(row);
  }

  // Emits the 'delet' event with one parameter.
  // The parameter is typed as 'any' for flexibility and future-proofing.
  onDelete(row: any) {
    this.delete.emit(row);
  }
}
