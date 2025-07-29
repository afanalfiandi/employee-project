import { inject, Injectable } from "@angular/core";
import { EMPLOYEE } from "../../shared/dummy/employee.dummy";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Employee } from "../../shared/interfaces/employee.interface";
import { PaginationService } from "../../shared/components/pagination/pagination.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    /* Inject PaginationService */
    private _paginationService = inject(PaginationService);

    /* Observable to hold employee data */
    _employee$ = new BehaviorSubject<Employee[]>(EMPLOYEE);

    /* Replace current employee data with a new one */
    set(data: Employee[]): void {
        this._employee$.next(data);
    }

    /* Add a new employee to the current list */
    add(newEmployee: Employee): void {
        this._employee$.next([...this._employee$.value, newEmployee]);
    }

    /* Get employee list, optionally filtered by keyword and paginated */
    get(keyword?: string): Observable<Employee[]> {
        return this._employee$.pipe(
            map((employees) => {
                let filtered = employees;

                /* Apply search filter if keyword is provided */
                if (keyword?.trim()) {
                    const lowerKeyword = keyword.toLowerCase();
                    filtered = employees.filter((emp) =>
                        emp.username?.toLowerCase().includes(lowerKeyword) ||
                        emp.firstName?.toLowerCase().includes(lowerKeyword) ||
                        emp.lastName?.toLowerCase().includes(lowerKeyword) ||
                        emp.email?.toLowerCase().includes(lowerKeyword)
                    );
                }

                /* Update pagination state */
                const { page, perPage } = this._paginationService._pagination$.value;
                const totalItems = filtered.length;
                const totalPage = Math.ceil(totalItems / perPage);

                this._paginationService._pagination$.next({
                    ...this._paginationService._pagination$.value,
                    totalItems,
                    totalPage,
                });

                /* Return paginated data */
                const start = (page - 1) * perPage;
                const end = start + perPage;
                return filtered.slice(start, end);
            })
        );
    }

    /* Delete employee by username */
    delete(username: string) {
        const current = this._employee$.value;
        const filtered = current.filter(emp => emp.username !== username);
        this._employee$.next(filtered);
    }
}