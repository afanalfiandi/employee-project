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

@Component({
  selector: 'app-employee',
  imports: [CardComponent, InputComponent, ReactiveFormsModule, ButtonComponent, TableComponent, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent extends BaseComponent implements OnInit {
  private _breadcrumbService = inject(BreadcrumbsService);
  private _employeeService = inject(EmployeeService);
  private _loadingService = inject(LoadingService);
  private _paginationService = inject(PaginationService);
  private _router = inject(Router);

  isLoading$ = this._loadingService._isLoading$;
  searchForm!: FormGroup;
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

  employee: Employee[] = [];

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl('')
    });

    this.getEmployee();
    this.paginationRefresh();
    this.searchEmployee();
    this.setBreadcrumb();
  }

  setBreadcrumb() {
    const breadcrumbs: Breadcrumb[] = [
      {
        label: 'Employee',
        path: '/employee'
      }
    ];
    this._breadcrumbService.set(breadcrumbs)
  }

  getEmployee(keyword?: string) {
    this._employeeService.get(keyword).pipe(
      takeUntil(this._onDestroy$),
      tap((res) => {
        this.employee = res;
      })
    ).subscribe();
  }

  searchEmployee() {
    this.searchForm.get('keyword')?.valueChanges
      .pipe(
        takeUntil(this._onDestroy$),
        debounceTime(300),
        tap((keyword) => {
          this._paginationService._pagination$.next({
            ...this._paginationService._pagination$.value,
            page: 1,
          });
          this.getEmployee(keyword);
        }))
      .subscribe();
  }

  onAdd() {
    this._router.navigate(['/employee/create']);
  }

  paginationRefresh() {
    this._paginationService.refresh$.pipe(
      takeUntil(this._onDestroy$),
      tap(() => {
        this.getEmployee(this.searchForm.get('keyword')?.value);
      })
    ).subscribe();
  }

  onEdit(event: any) {
    console.log('edit clicked', event)
  }
}
