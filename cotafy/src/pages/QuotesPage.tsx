import { useEffect, useState } from "react";
import { Grid, Skeleton, Typography } from "@mui/material";
import PageContainer from "../components/common/PageContainer";
import CurrencyCard from "../components/common/CurrencyCard";
import ErrorMessage from "../components/common/ErrorMessage";
import { getQuotes } from "../services/api";
import type { Quote } from "../types/type";

// Principais moedas do mundo
const CODES = ["USD-BRL", "EUR-BRL", "GBP-BRL", "ARS-BRL", "JPY-BRL", "CAD-BRL", "BTC-BRL", "ETH-BRL", "LTC-BRL"];

// Horário da cotação mais recente da lista (timestamp da API vem em segundos)
function formatLastUpdate(quotes: Quote[]) {
    const latest = Math.max(...quotes.map((quote) => Number(quote.timestamp)));
    return new Date(latest * 1000).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // Incrementado pelo "Tentar novamente" para o useEffect buscar de novo
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let ignore = false;

        getQuotes(CODES)
            .then((data) => {
                if (!ignore) setQuotes(data);
            })
            .catch((err: Error) => {
                if (!ignore) setError(err.message);
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        // Evita atualizar o estado se a página for fechada antes da resposta chegar
        return () => {
            ignore = true;
        };
    }, [attempt]);

    function handleRetry() {
        setError("");
        setLoading(true);
        setAttempt((current) => current + 1);
    }

    return (
        <PageContainer title="Cotações" subtitle="Valor atual das principais moedas e criptomoedas em reais">
            {error ? (
                <ErrorMessage message={error} onRetry={handleRetry} />
            ) : (
                <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {loading ? <Skeleton width={220} /> : `Última atualização: ${formatLastUpdate(quotes)}`}
                    </Typography>

                    <Grid container spacing={2}>
                        {loading
                            ? CODES.map((code) => (
                                <Grid key={code} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Skeleton variant="rounded" height={156} />
                                </Grid>
                            ))
                            : quotes.map((quote) => (
                                <Grid key={quote.code} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <CurrencyCard
                                        code={quote.code}
                                        name={quote.name.split("/")[0]}
                                        value={Number(quote.bid)}
                                        pctChange={Number(quote.pctChange)}
                                        to={`/moeda/${quote.code}`}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </>
            )}
        </PageContainer>
    );
}

export default QuotesPage;
