import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pagination } from "../../../core/interfaces/pagination.interface";

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    refresh$ = new BehaviorSubject<void>(undefined);
    _pagination$ = new BehaviorSubject<Pagination>({
        page: 1,
        totalItems: 0,
        perPage: 10,
        totalPage: 0,
    })

    onPageChange(action: 'next' | 'prev') {
        const current = this._pagination$.value;
        const newPage = action === 'next' ? current.page + 1 : current.page - 1;

        this._pagination$.next({ ...current, page: newPage });
        this.refresh$.next();
    }

    onPerPageChange(total: number) {
        const current = this._pagination$.value;

        this._pagination$.next({ ...current, perPage: total, page: 1 });
        this.refresh$.next();
    }
}