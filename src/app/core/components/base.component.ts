import { Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export abstract class BaseComponent implements OnDestroy {
    /**
     * This is the abstraction class which used as base for all component that need clean while component destroyed
    */
    protected readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor() { }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
}