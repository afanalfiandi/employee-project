import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../pages/auth/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    private _authService = inject(AuthService);
    private _router = inject(Router);

    canActivate(): boolean {
        if (this._authService.isLoggedIn()) return true;
        this._router.navigate(["/"]);
        return false;
    }
}