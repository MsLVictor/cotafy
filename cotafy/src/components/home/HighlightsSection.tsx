import { Box, Button, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import type { Quote } from "../../types/type";
import { getQuotes } from "../../services/api";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import CurrencyCard from "../common/CurrencyCard";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CODES = ["USD-BRL", "EUR-BRL", "BTC-BRL"];

function HighlightsSection() {

    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        getQuotes(CODES)
            .then((data) => setQuotes(data))
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }, [attempt]);

    function handleRetry() {
        setError("");
        setLoading(true);
        setAttempt(attempt + 1);
    }

    return (
        <Box component="section" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
                <Box>
                    <Typography variant="h2" sx={{ fontSize: '1.875rem', letterSpacing: '-0.01em' }}>
                        Destaques do dia
                    </Typography>
                    <Typography color="textSecondary" sx={{ mt: 0.75 }}>
                        Dólar, euro e bitcoin em reais, com a variação de hoje.
                    </Typography>
                </Box>
                <Button component={Link} to="/cotacoes" endIcon={<ArrowForwardIcon />}>
                    Ver todas as cotações
                </Button>
            </Box>


            {loading && <Loading message="Carregando cotações..." />}
            {error && <ErrorMessage message={error} onRetry={handleRetry} />}

            <Grid container spacing={2.5}>
                {quotes.map((quote) => (
                    <Grid key={quote.code} size={{ xs: 12, md: 4 }}>
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
        </Box>
    )
}

export default HighlightsSection;
