import collect, { Collection } from 'collect.js';
import * as Crypto from 'crypto-js';
import { LocalStorageServiceInterface } from '../interfaces/local-storage.interface';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalstorageService implements LocalStorageServiceInterface {
    private _result: string = '';

    constructor() { }

    save(key: string, data: string): void {
        const _test = this.encrypt(data);
        localStorage.setItem(key, _test);
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

    get(key: string): this {
        const _data = localStorage.getItem(key) || '';
        this._result = this.decrypt(_data);
        return this;
    }

    toString(): string {
        return this._result as string;
    }

    toCollection<T>(): Collection<T> {
        const _temp =
            this._result !== undefined || this._result !== ''
                ? JSON.parse(this._result as string)
                : {};
        return collect(_temp);
    }

    toObject<T>(): T {
        return JSON.parse(this._result);
    }

    private encrypt(data: string): string {
        return Crypto.AES.encrypt(data, environment.LOCALKEY).toString();
    }

    private decrypt(data: string): string {
        return Crypto.AES.decrypt(data, environment.LOCALKEY).toString(
            Crypto.enc.Utf8
        );
    }
}