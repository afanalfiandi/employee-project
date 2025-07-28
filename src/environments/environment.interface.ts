export interface EnvironmentInterface {
    /**
     * Define application mode. set true for production mode
     *
     */
    production: boolean;

    /**
     * Define local key for encryption
     * @example 'your_s4lt_h3r3'
     */
    LOCALKEY: string;
}