import { inject, Injectable } from "@angular/core";
import { LocalstorageService } from "../../core/services/local-storage.service";
import { AUTH } from "../../shared/dummy/auth.dummy";
import { of } from "rxjs";
import { LoadingService } from "../../shared/components/loading/loading.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _router = inject(Router);
    private _localstorageService = inject(LocalstorageService);
    private _loadingService = inject(LoadingService);

    auth(username: string, password: string) {
        const isAvailable = AUTH.find((auth) => auth.username === username && auth.password === password);
        const dummytoken = new Date().toISOString()

        // simulate loading while waiting response from api
        this._loadingService.show();
        setTimeout(() => {
            this._loadingService.hide();
        }, 2000);

        return isAvailable
            ? (this._localstorageService.save('token', dummytoken), of(true))
            : of(false);
    }

    isLoggedIn(): boolean {
        return !!this._localstorageService.get("token").value()
    }

    logout() {
        this._localstorageService.remove("token");
        this._router.navigate(['/auth']);
    }
}