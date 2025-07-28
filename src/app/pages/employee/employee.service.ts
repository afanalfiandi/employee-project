import { inject, Injectable } from "@angular/core";
import { EMPLOYEE } from "../../shared/dummy/employee.dummy";
import { BehaviorSubject, map, Observable, of, tap } from "rxjs";
import { Employee } from "../../shared/interfaces/employee.interface";
import { PaginationService } from "../../shared/components/pagination/pagination.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private _paginationService = inject(PaginationService);
    _employee$ = new BehaviorSubject<Employee[]>(EMPLOYEE);

    set(data: Employee[]): void {
        this._employee$.next(data);
    }

    add(newEmployee: Employee): void {
        this._employee$.next([...this._employee$.value, newEmployee]);
    }

    get(keyword?: string): Observable<Employee[]> {
        return this._employee$.pipe(
            map((employees) => {
                let filtered = employees;

                if (keyword?.trim()) {
                    const lowerKeyword = keyword.toLowerCase();
                    filtered = employees.filter((emp) =>
                        emp.username?.toLowerCase().includes(lowerKeyword) ||
                        emp.firstName?.toLowerCase().includes(lowerKeyword) ||
                        emp.lastName?.toLowerCase().includes(lowerKeyword) ||
                        emp.email?.toLowerCase().includes(lowerKeyword)
                    );
                }

                const { page, perPage } = this._paginationService._pagination$.value;
                const totalItems = filtered.length;
                const totalPage = Math.ceil(totalItems / perPage);

                this._paginationService._pagination$.next({
                    ...this._paginationService._pagination$.value,
                    totalItems,
                    totalPage,
                });

                const start = (page - 1) * perPage;
                const end = start + perPage;
                return filtered.slice(start, end);
            })
        );
    }
}