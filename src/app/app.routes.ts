import { Routes } from '@angular/router';
import { MainComponent } from './shared/layout/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

/*
    This is the list of routes used in this project.
    By default, when a user visits the root URL (path: ''), they will be redirected to the login page (path: 'auth').
    The 'redirectTo' property handles the redirection, and 'pathMatch: full' ensures the redirection only happens for an exact empty path.

    This route setup has 3 main parts:

    1. Redirect from '' to 'auth' as the default page.
    2. 'auth' route loads the login page (AuthComponent).
    3. Authenticated routes are inside MainComponent, including:
        - 'dashboard'
        - 'employee' (lazy-loaded)

    These child routes can be protected using an AuthGuard to restrict access only for logged-in users.
*/

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
        canActivate: [AuthGuard],
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
