import { Box, Card, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { HistoryItem, Quote } from "../../types/type";
import { getHistory, getQuotes } from "../../services/api";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";


function DollarCard() {


    const [quote, setQuote] = useState<Quote | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        async function loadDollar() {
            try {
                const quotes = await getQuotes(["USD-BRL"]);
                const days = await getHistory("USD-BRL", 7);
                setQuote(quotes[0]);
                setHistory(days);
            } catch {
                setError("Não foi possível carregar a cotação do dólar.");
            } finally {
                setLoading(false);
            }
        }
        loadDollar();
    }, [attempt]);

    function handleRetry() {
        setError("");
        setLoading(true);
        setAttempt(attempt + 1);
    }

    const pct = quote ? Number(quote.pctChange) : 0;
    const up = pct >= 0;
    const ordered = [...history].reverse();
    const values = ordered.map((day) => Number(day.bid));
    const dates = ordered.map((day) => 
        new Date(Number(day.timestamp) * 1000).toLocaleDateString("pt-BR", {day: "2-digit", month: "2-digit"}),
    );

    return (
        <Card variant="outlined" sx={{ p: 3.5, borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {loading && <Loading message="Carregando o dólar" />}
            {error && <ErrorMessage message={error} onRetry={handleRetry} />}
            {quote && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            {quote.name.split("/")[0]} · {quote.code}/{quote.codein}
                        </Typography>
                        <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', mt: 0.5 }}>
                            {Number(quote.bid).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </Typography>
                    </Box>
                    <Chip
                        label={`${up ? '▲ +' : '▼ '}${pct.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}
                        sx={{
                            fontWeight: 700,
                            color: up ? '#4ADE80' : '#F87171',
                            bgcolor: up ? 'rgba(74, 222, 128, 0.12)' : 'rgba(248, 113, 113, 0.12)',
                        }}
                    />
                </Box>
            )}
            {history.length > 0 && (
                <Box sx={{ '& .MuiLineChart-area': {fillOpacity: 0.2 } }}>
                    <SparkLineChart data={values} height={140} area curve="natural" color="#2dd4bf"/>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            {dates.map((date, index) => (
                                <Typography key={index} variant="caption" color="textSecondary">
                                    {date}
                                </Typography>
                            ))}
                    </Box>
                </Box>
            )}
        </Card>
    )
}

export default DollarCard
