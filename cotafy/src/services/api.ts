import type { ApiErrorResponse, HistoryItem, Quote, QuotesResponse } from "../types/type";

const BASE_URL = "https://economia.awesomeapi.com.br/json";

// Faz o GET e lança erro com a mensagem da API quando a resposta não é ok (ex.: 404 CoinNotExists)
async function request<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`);

    if (!response.ok) {
        const body = (await response.json().catch(() => null)) as ApiErrorResponse | null;
        throw new Error(body?.message ?? `Erro ${response.status} ao consultar a AwesomeAPI`);
    }

    return response.json() as Promise<T>;
}

// Cotação atual dos pares informados, na mesma ordem. Ex.: getQuotes(["USD-BRL", "EUR-BRL"])
export async function getQuotes(codes: string[]): Promise<Quote[]> {
    if (codes.length === 0) {
        throw new Error("Informe ao menos uma moeda");
    }

    const data = await request<QuotesResponse>(`/last/${codes.join(",")}`);

    return codes.map((code) => {
        const quote = data[code.replace("-", "")];
        if (!quote) {
            throw new Error(`Moeda não encontrada: ${code}`);
        }
        return quote;
    });
}

// Histórico diário do par, do mais recente para o mais antigo. Ex.: getHistory("USD-BRL", 7)
export async function getHistory(code: string, days: number): Promise<HistoryItem[]> {
    if (!Number.isInteger(days) || days < 1) {
        throw new Error("A quantidade de dias deve ser um inteiro maior que zero");
    }

    const data = await request<HistoryItem[]>(`/daily/${code}/${days}`);

    if (data.length === 0) {
        throw new Error(`Moeda não encontrada: ${code}`);
    }

    return data;
}
