import { Injectable } from "@angular/core";
import { EMPLOYEE } from "../../shared/dummy/employee.dummy";
import { BehaviorSubject, map, Observable, of, tap } from "rxjs";
import { Employee } from "../../shared/interfaces/employee.interface";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    _employee$ = new BehaviorSubject<Employee[]>(EMPLOYEE);

    set(data: Employee[]): void {
        this._employee$.next(data);
    }

    add(newEmployee: Employee): void {
        this._employee$.next([...this._employee$.value, newEmployee]);
    }

    search(keyword?: string): Observable<Employee[]> {
        return this._employee$.pipe(
            map((employees) => {
                if (keyword && keyword.trim() !== '') {
                    const lowerKeyword = keyword.toLowerCase();
                    const filtered = employees.filter((emp) =>
                        emp.username?.toLowerCase().includes(lowerKeyword) ||
                        emp.firstName?.toLowerCase().includes(lowerKeyword) ||
                        emp.lastName?.toLowerCase().includes(lowerKeyword) ||
                        emp.email?.toLowerCase().includes(lowerKeyword)
                    );
                    return filtered;
                }
                return employees;
            })
        );
    }

}