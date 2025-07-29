import { Routes } from '@angular/router';
import { MainComponent } from './shared/layout/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: "auth",
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
