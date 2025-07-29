import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Breadcrumb } from "./breadcrumbs.interface";

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbsService {
    /* Observable state to hold the list of current breadcrumbs */
    _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

    /* Method to update the breadcrumb list */
    set(breadcrumbs: Breadcrumb[]) {
        this._breadcrumbs$.next(breadcrumbs)
    }
}
