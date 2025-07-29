import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../shared/components/breadcrumbs/breadcrumbs.service';
import { BaseComponent } from '../../core/components/base.component';
import { Breadcrumb } from '../../shared/components/breadcrumbs/breadcrumbs.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import { InputComponent } from "../../shared/components/input/input.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { EmployeeService } from './employee.service';
import { debounceTime, takeUntil, tap } from 'rxjs';
import { Employee } from '../../shared/interfaces/employee.interface';
import { TableComponent } from "../../shared/components/table/table.component";
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../shared/components/loading/loading.service';
import { PaginationService } from '../../shared/components/pagination/pagination.service';
import { Router } from '@angular/router';
import { Confirmable } from 'app/shared/utils/confirmable.util';

@Component({
  selector: 'app-employee',
  imports: [CardComponent, InputComponent, ReactiveFormsModule, ButtonComponent, TableComponent, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent extends BaseComponent implements OnInit {
  // Inject necessary services
  private _breadcrumbService = inject(BreadcrumbsService);
  private _employeeService = inject(EmployeeService);
  private _loadingService = inject(LoadingService);
  private _paginationService = inject(PaginationService);
  private _router = inject(Router);

  // Observable to track loading state
  isLoading$ = this._loadingService._isLoading$;

  // Search form group
  searchForm!: FormGroup;

  // Define table columns
  tableColumns: string[] = [
    'username',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'status',
    'basicSalary',
    'group',
    'description',
    'action',
  ];

  // Data source for employee list
  employee: Employee[] = [];

  ngOnInit(): void {
    // Initialize search form
    this.searchForm = new FormGroup({
      keyword: new FormControl('')
    });

    // Fetch initial employee list
    this.getEmployee();

    // Setup pagination refresh handler
    this.paginationRefresh();

    // Handle search form input changes
    this.searchEmployee();

    // Set breadcrumb navigation
    this.setBreadcrumb();
  }

  // Set breadcrumb path for current page
  setBreadcrumb() {
    const breadcrumbs: Breadcrumb[] = [
      {
        label: 'Employee',
        path: '/employee'
      }
    ];
    this._breadcrumbService.set(breadcrumbs)
  }

  // Fetch employee data (optionally with keyword search)
  getEmployee(keyword?: string) {
    this._employeeService.get(keyword).pipe(
      takeUntil(this._onDestroy$),
      tap((res) => {
        this.employee = res;
      })
    ).subscribe();
  }

  // Listen to keyword changes and fetch filtered employees
  searchEmployee() {
    this.searchForm.get('keyword')?.valueChanges
      .pipe(
        takeUntil(this._onDestroy$),
        debounceTime(300),
        tap((keyword) => {
          // Reset pagination to page 1
          this._paginationService._pagination$.next({
            ...this._paginationService._pagination$.value,
            page: 1,
          });
          this.getEmployee(keyword);
        }))
      .subscribe();
  }

  // Navigate to employee creation form
  onAdd() {
    this._router.navigate(['/employee/create']);
  }

  // Navigate to employee update form with selected data
  onEdit(data: Employee) {
    this._router.navigate(['/employee/update', data.username])
  }

  // Show confirmation dialog before deleting an employee
  onDelete(data: Employee) {
    const icon = "warning"
    const msg = "Are you sure you want to delete this data?";
    const title = "Delete Employee";
    const confirmBtn = "Delete";

    Confirmable(icon, msg, title, confirmBtn, () => this.deleteEmployee(data.username));
  }

  // Refresh employee list when pagination changes
  paginationRefresh() {
    this._paginationService.refresh$.pipe(
      takeUntil(this._onDestroy$),
      tap(() => {
        this.getEmployee(this.searchForm.get('keyword')?.value);
      })
    ).subscribe();
  }

  // Call service to delete employee
  deleteEmployee(username: string) {
    this._employeeService.delete(username)
  }
}
