export interface Quote {
    code: string;
    codein: string;
    name: string;
    bid: string;
    ask: string;
    high: string;
    low: string;
    pctChange: string;
    varBid: string;
    timestamp: string;
    create_date: string;
}

export type QuotesResponse = Record<string, Quote>;

export type HistoryItem = Pick<Quote, "bid" | "ask" | "high" | "low" | "pctChange" | "varBid" | "timestamp">
    & Partial<Pick<Quote, "code" | "codein" | "name" | "create_date">>;

export interface ApiErrorResponse {
    status: number;
    code: string;
    message: string;
}
