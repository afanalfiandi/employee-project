// Marks this class as an Angular service
import { Injectable } from "@angular/core";

// Imports BehaviorSubject from RxJS to manage reactive state
import { BehaviorSubject } from "rxjs";

// Registers the service globally (available throughout the app)
@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    // BehaviorSubject holds the current loading state (true = loading, false = not loading)
    // The dollar sign ($) conventionally indicates this is an observable
    _isLoading$ = new BehaviorSubject<boolean>(false);

    // Call this method to show the loading indicator
    show() {
        this._isLoading$.next(true);
    }

    // Call this method to hide the loading indicator
    hide() {
        this._isLoading$.next(false);
    }
}
