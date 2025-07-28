import { Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export abstract class BaseComponent implements OnDestroy {
    protected readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor() { }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
}