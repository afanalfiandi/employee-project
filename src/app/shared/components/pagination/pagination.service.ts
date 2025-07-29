import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pagination } from "../../../core/interfaces/pagination.interface";

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    // Refresher pagination
    refresh$ = new BehaviorSubject<void>(undefined);
    // Initial value of pagination
    _pagination$ = new BehaviorSubject<Pagination>({
        page: 1,
        totalItems: 0,
        perPage: 10,
        totalPage: 0,
    })

    // Method to display next row data or previous
    onPageChange(action: 'next' | 'prev') {
        // get the current pagination data first
        const current = this._pagination$.value;
        // if action is next, the current page will be add by 1
        const newPage = action === 'next' ? current.page + 1 : current.page - 1;

        // replace pagination data with the new one based on action params
        this._pagination$.next({ ...current, page: newPage });
        this.refresh$.next();
    }

    // method to change items per page
    onPerPageChange(total: number) {
        const current = this._pagination$.value;

        this._pagination$.next({ ...current, perPage: total, page: 1 });
        this.refresh$.next();
    }
}