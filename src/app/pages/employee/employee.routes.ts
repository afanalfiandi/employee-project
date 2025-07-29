// employee.routes.ts

import { Routes } from "@angular/router";
import { FormComponent } from "./form/form.component";
import { EmployeeComponent } from "./employee.component";

export default [
    {
        path: '',
        children: [
            { path: '', component: EmployeeComponent },
            { path: 'create', component: FormComponent },
            { path: 'update/:username', component: FormComponent },
        ],
    },
] as Routes;
