import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Breadcrumb } from 'app/shared/components/breadcrumbs/breadcrumbs.interface';
import { BreadcrumbsService } from 'app/shared/components/breadcrumbs/breadcrumbs.service';
import { CardComponent } from 'app/shared/components/card/card.component';
import { InputComponent } from "app/shared/components/input/input.component";
import { ButtonComponent } from "app/shared/components/button/button.component";
import { numberValidator } from 'app/core/validators/number.validator';
import { EmployeeService } from '../employee.service';
import { Toast } from 'app/shared/utils/toast.util';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'app/shared/interfaces/employee.interface';

@Component({
  selector: 'app-form',
  imports: [CardComponent, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _breadcrumbService = inject(BreadcrumbsService);
  private _employeeService = inject(EmployeeService);
  private _fb = inject(FormBuilder);

  form!: FormGroup;
  _employee$ = this._employeeService._employee$.value;
  selectedEmployee!: Employee | undefined;

  selectedUsername!: string;

  ngOnInit(): void {
    const username = this._route.snapshot.params['username'];
    const employees = this._employeeService._employee$.value;

    this.selectedEmployee = employees.find(emp => emp.username === username);

    this.setBreadcrumb();
    this.initForm();
  }

  setBreadcrumb() {
    const breadcrumbs: Breadcrumb[] = [
      {
        label: 'Employee',
        path: '/employee'
      },
      {
        label: 'Create',
        path: '/employee/create'
      },
    ];
    this._breadcrumbService.set(breadcrumbs)
  }

  initForm() {
    this.form = this._fb.group({
      username: [{
        value: this.selectedEmployee?.username ?? '',
        disabled: !!this.selectedEmployee?.username
      }, Validators.required], firstName: [this.selectedEmployee?.firstName ?? '', Validators.required],
      lastName: [this.selectedEmployee?.lastName ?? '', Validators.required],
      email: [
        this.selectedEmployee?.email ?? '',
        [Validators.required, Validators.email]
      ],
      birthDate: [this.selectedEmployee?.birthDate ?? '', Validators.required],
      basicSalary: [
        this.selectedEmployee?.basicSalary ?? null,
        [Validators.required, numberValidator]
      ],
      status: [this.selectedEmployee?.status ?? '', Validators.required],
      group: [this.selectedEmployee?.group ?? '', Validators.required],
      description: [this.selectedEmployee?.description ?? '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const updated = this.form.value;
    const currentEmployees = this._employeeService._employee$.value;

    const isExisting = currentEmployees.some(emp => emp.username === updated.username);

    let updatedEmployees;

    if (isExisting) {
      updatedEmployees = currentEmployees.map(emp =>
        emp.username === updated.username ? { ...emp, ...updated } : emp
      );
    } else {
      updatedEmployees = [...currentEmployees, updated];
    }

    this._employeeService._employee$.next(updatedEmployees);

    Toast('success', isExisting ? 'Updated Successfully' : 'Created Successfully');
    this.form.reset();
    this._router.navigate(['/employee']);
  }
}
