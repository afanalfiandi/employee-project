export interface Result<T> {
    message: string,
    status: number,
    data?: T
}