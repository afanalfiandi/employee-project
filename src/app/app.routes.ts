import { Routes } from '@angular/router';
import { MainComponent } from './shared/layout/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { EmployeeComponent } from './pages/employee/employee.component';
import { FormComponent } from './pages/employee/form/form.component';

export const routes: Routes = [
    {
        path: "",
        component: AuthComponent,
    },
    {
        path: "",
        component: MainComponent,
        children: [
            {
                path: "dashboard",
                component: DashboardComponent,
            },
            {
                path: 'employee',
                loadChildren: () =>
                    import(
                        'app/pages/employee/employee.routes'
                    ),
            },
        ],
    },
];
