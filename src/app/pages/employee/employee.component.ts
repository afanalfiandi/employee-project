import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../shared/components/breadcrumbs/breadcrumbs.service';
import { BaseComponent } from '../../core/components/base.component';
import { Breadcrumb } from '../../shared/components/breadcrumbs/breadcrumbs.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import { InputComponent } from "../../shared/components/input/input.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { EmployeeService } from './employee.service';
import { tap } from 'rxjs';
import { Employee } from '../../shared/interfaces/employee.interface';
import { TableComponent } from "../../shared/components/table/table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [CardComponent, InputComponent, ReactiveFormsModule, ButtonComponent, TableComponent, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent extends BaseComponent implements OnInit {
  private _breadcrumbService = inject(BreadcrumbsService);
  private _employeeService = inject(EmployeeService);

  searchForm!: FormGroup;
  tableColumns: string[] = [
    'username',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'status',
  ];
  _employees$ = this._employeeService.employee$;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl('')
    });

    this.setBreadcrumb();
    this.getEmployee();
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

  getEmployee() {
    this._employeeService.employee$.pipe(
      tap((employee: Employee[]) => {
        console.log(employee)
      })
    ).subscribe()
  }

  onAdd() {
    console.log('clicked')
  }
}
