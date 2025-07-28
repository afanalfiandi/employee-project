import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    _show$ = new BehaviorSubject<boolean>(false);

    toggle(isShow: boolean) {
        this._show$.next(isShow)
    }
}