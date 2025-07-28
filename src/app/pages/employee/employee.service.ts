import { Injectable } from "@angular/core";
import { EMPLOYEE } from "../../shared/dummy/employee.dummy";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Employee } from "../../shared/interfaces/employee.interface";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private _employee$ = new BehaviorSubject<Employee[]>(EMPLOYEE);

    readonly employee$ = this._employee$.asObservable();

    get employee(): Employee[] {
        return this._employee$.value;
    }

    set(data: Employee[]): void {
        this._employee$.next(data);
    }

    add(newEmployee: Employee): void {
        this._employee$.next([...this._employee$.value, newEmployee]);
    }

    get(): Observable<Employee[]> {
        return this.employee$;
    }
}