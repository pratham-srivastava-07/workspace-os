export interface PaginationParams {
    cursor?: string;
    limit?: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    nextCursor?: string;
}

export function getPaginationOptions(params: PaginationParams) {
    const limit = Math.min(params.limit || 20, 50);
    const cursor = params.cursor;

    return {
        take: limit,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
    };
}
