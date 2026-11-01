// Estrutura de dados da AwesomeAPI. A API devolve os valores numéricos e as datas como string.

// Cotação retornada por /json/last
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

// Resposta de /json/last/USD-BRL,EUR-BRL: objeto indexado pelo par sem hífen ("USDBRL", "EURBRL"...)
export type QuotesResponse = Record<string, Quote>;

// Item de /json/daily/USD-BRL/7: só o primeiro item traz code, codein, name e create_date
export type HistoryItem = Pick<Quote, "bid" | "ask" | "high" | "low" | "pctChange" | "varBid" | "timestamp">
    & Partial<Pick<Quote, "code" | "codein" | "name" | "create_date">>;

// Corpo de erro da AwesomeAPI (ex.: 404 CoinNotExists)
export interface ApiErrorResponse {
    status: number;
    code: string;
    message: string;
}
