import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Breadcrumb } from 'app/shared/components/breadcrumbs/breadcrumbs.interface';
import { BreadcrumbsService } from 'app/shared/components/breadcrumbs/breadcrumbs.service';
import { CardComponent } from 'app/shared/components/card/card.component';
import { InputComponent } from "app/shared/components/input/input.component";
import { ButtonComponent } from "app/shared/components/button/button.component";
import { numberValidator } from 'app/core/validators/number.validator';
import { EmployeeService } from '../employee.service';
import { Toast } from 'app/shared/utils/toast.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [CardComponent, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  private _router = inject(Router);
  private _breadcrumbService = inject(BreadcrumbsService);
  private _employeeService = inject(EmployeeService);

  form!: FormGroup;

  ngOnInit(): void {
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
    this.form = new FormGroup({
      username: new FormControl<string>('', [Validators.required]),
      firstName: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      birthDate: new FormControl<string>('', [Validators.required]),
      basicSalary: new FormControl<number | null>(null, [
        Validators.required,
        numberValidator,
      ]), status: new FormControl<string>('', [Validators.required]),
      group: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>('', [Validators.required])
    })
  }

  onCreate() {
    console.log('create')
  }

  onUpdate() {
    console.log('update')
  }

  onSubmit() {
    const currentEmployees = this._employeeService._employee$.value;

    const updatedEmployees = [
      ...currentEmployees,
      this.form.value
    ];

    console.log(updatedEmployees)

    this._employeeService._employee$.next(updatedEmployees);
    this.form.reset();
    Toast('success', 'Success');
    this._router.navigate(['/employee'])
  }
}
