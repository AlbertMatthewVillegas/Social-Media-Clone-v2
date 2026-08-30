export interface ListResponse<T> {
    message?: string;
    entities?: T[]
    length?: number;
}