import { Collection } from "collect.js";

export interface LocalStorageServiceInterface {

    /**
     * Saving data to localstorage
     *
     * @param key key of data
     * @param data data to be stored
     */
    save(key: string, data: string): void;

    /**
     * Removing data from localstorage
     *
     * @param key
     */
    remove(key: string): void;

    /**
     * Clear all localstorage data
     *
     */
    clear(): void;

    /**
     * Getting data from localstorage. You need cast to object or to string
     *
     * @param key
     * @example get('data').toObject<PersonalInformation>();
     */
    get(key: string): this;

    /**
     * Casting value from get() method
     *
     */
    toString(): string;

    /**
     * Casting value from get() method
     *
     */
    toCollection<T>(): Collection<T>;

    /**
     * Casting value from get() method
     *
     */
    toObject<T>(): T;
}