import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../pages/auth/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    /*
        AuthGuard is used to restrict access to the application and prevent unauthorized users 
        from accessing or injecting into the project without valid credentials.
        It checks the login status through the AuthService, and if no token is found, 
        the user will be redirected to the authentication page.
    */
    private _authService = inject(AuthService);
    private _router = inject(Router);

    canActivate(): boolean {
        if (this._authService.isLoggedIn()) return true;
        this._router.navigate(["/"]);
        return false;
    }
}