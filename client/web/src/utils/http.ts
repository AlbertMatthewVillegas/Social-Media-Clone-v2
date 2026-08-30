import { HttpError } from "../exceptions/HttpError";

function buildUrl(baseUrl: string, reqParams: string[]): URL {
    const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
    const pathSegments = reqParams
        .map(param => param.replace(/^\/+|\/+$/g, ''))
        .filter(Boolean)
        .join('/');

    const finalUrl = pathSegments
        ? `${cleanBaseUrl}/${pathSegments}`
        : cleanBaseUrl;

    return new URL(finalUrl);
}

export const http = {
    get: async <R>(url: string, reqParams: string[] = []): Promise<R> => {
        const finalUrl = buildUrl(url, reqParams);
        const options: RequestInit = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        };

        console.log(finalUrl)

        const response = await fetch(finalUrl, options);
        if (!response.ok) throw new HttpError(response.statusText, response.status);
        return await response.json() as R;
    },

    post: async <T, R>(url: string, reqBody?: T): Promise<R> => {
        const options: RequestInit = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: (reqBody ? JSON.stringify(reqBody) : null),
        };

        // DEBUGGER
        console.log(url)

        const response = await fetch(url, options);
        if (!response.ok) throw new HttpError(response.statusText, response.status);
        return await response.json() as R;
    },

    put: async <T, R>(url: string, reqParams: string[] = [], reqBody: T): Promise<R> => {
        const finalUrl = buildUrl(url, reqParams);
        const options: RequestInit = {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
        };

        const response = await fetch(finalUrl, options);
        if (!response.ok) throw new HttpError(response.statusText, response.status);
        return await response.json() as R;
    },

    delete: async <R>(url: string, reqParams: string[] = []): Promise<R> => {
        const finalUrl = buildUrl(url, reqParams);
        const options: RequestInit = {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(finalUrl, options);
        if (!response.ok) throw new HttpError(response.statusText, response.status);
        
        // Handle 204 No Content safely
        if (response.status === 204) return {} as R;
        return await response.json() as R;
    }
}