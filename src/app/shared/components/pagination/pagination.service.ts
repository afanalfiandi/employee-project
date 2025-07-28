import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pagination } from "../../../core/interfaces/pagination.interface";

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    _pagination$ = new BehaviorSubject<Pagination>({
        page: 1,
        totalItems: 0,
        perPage: 10,
        totalPage: 0,
    })

    onPageChange(action: 'next' | 'prev') {
        const currentPagination = this._pagination$.value;

        if (action === 'next') {
            this._pagination$.next({
                ...currentPagination,
                page: currentPagination.page + 1
            })
        } else {
            this._pagination$.next({
                ...currentPagination,
                page: currentPagination.page - 1
            })
        }
    }

    onPerPageChange(total: number) {
        const currentPagination = this._pagination$.value;

        this._pagination$.next({
            ...currentPagination,
            perPage: total
        })
    }
}