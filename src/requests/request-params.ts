export interface RequestQueryParams {
    order?: string;
    filter?: string;
    query?: string;
    offset?: number;
    limit?: number;
    apiKey?: string;
    
    [paramName: string]: string | number | undefined;
}

