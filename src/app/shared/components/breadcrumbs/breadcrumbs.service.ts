import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Breadcrumb } from "./breadcrumbs.interface";

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbsService {
    _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

    set(breadcrumbs: Breadcrumb[]) {
        this._breadcrumbs$.next(breadcrumbs)
    }
}