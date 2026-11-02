import { useEffect, useState } from "react";
import { Box, Button, Grid, Skeleton, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PageContainer from "../components/common/PageContainer";
import CurrencyCard from "../components/common/CurrencyCard";
import ErrorMessage from "../components/common/ErrorMessage";
import { getQuotes } from "../services/api";
import type { Quote } from "../types/type";

// Principais moedas do mundo
const CODES = ["USD-BRL", "EUR-BRL", "GBP-BRL", "ARS-BRL", "JPY-BRL", "CAD-BRL", "BTC-BRL", "ETH-BRL", "LTC-BRL"];

// Vetor para permitir a separação entre moeda convencional e crypto moedas
const CRYPTOS = ["BTC", "ETH", "LTC"];

type Category = "todas" | "moedas" | "criptos";

// Minúsculas e sem acento, para "dolar" encontrar "Dólar"
function normalize(text: string) {
    return text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

// Horário em que as cotações foram buscadas; muda a cada clique em "Atualizar"
function formatLastUpdate(date: Date) {
    return date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
}

function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    // Incrementado pelo "Tentar novamente" e pelo "Atualizar" para o useEffect buscar de novo
    const [attempt, setAttempt] = useState(0);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<Category>("todas");

    useEffect(() => {
        let ignore = false;

        getQuotes(CODES)
            .then((data) => {
                if (!ignore) {
                    setQuotes(data);
                    setLastUpdate(new Date());
                }
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

    // Usado pelo "Tentar novamente" e pelo "Atualizar"
    function handleReload() {
        setError("");
        setLoading(true);
        setAttempt((current) => current + 1);
    }

    // Skeletons só na primeira carga; ao atualizar, os cards atuais continuam na tela
    const showSkeletons = loading && quotes.length === 0;

    function handleClearSearch() {
        setSearch("");
        setCategory("todas");
    }

    // Filtragem no estado: busca e categoria aplicadas juntas, sem nova requisição
    const term = normalize(search.trim());
    const filteredQuotes = quotes.filter((quote) => {
        const isCrypto = CRYPTOS.includes(quote.code);
        if (category === "moedas" && isCrypto) return false;
        if (category === "criptos" && !isCrypto) return false;
        return normalize(quote.code).includes(term) || normalize(quote.name.split("/")[0]).includes(term);
    });

    return (
        <PageContainer title="Cotações" subtitle="Valor atual das principais moedas e criptomoedas em reais">
            {error ? (
                <ErrorMessage message={error} onRetry={handleReload} />
            ) : (
                <>
                    <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                            {lastUpdate ? `Última atualização: ${formatLastUpdate(lastUpdate)}` : <Skeleton width={220} />}
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<RefreshIcon />}
                            loading={loading}
                            loadingPosition="start"
                            disabled={loading}
                            onClick={handleReload}
                        >
                            Atualizar
                        </Button>
                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3, alignItems: { sm: "center" } }}>
                        <TextField
                            label="Buscar moeda"
                            placeholder="Código ou nome (ex.: USD, euro)"
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            sx={{ flexGrow: 1 }}
                        />
                        <ToggleButtonGroup
                            exclusive
                            color="primary"
                            aria-label="Tipo de moeda"
                            value={category}
                            // value vem null ao clicar no botão já selecionado; mantém o filtro atual
                            onChange={(_event, value: Category | null) => value && setCategory(value)}
                        >
                            <ToggleButton value="todas" sx={{ flexGrow: 1 }}>Todas</ToggleButton>
                            <ToggleButton value="moedas" sx={{ flexGrow: 1 }}>Moedas</ToggleButton>
                            <ToggleButton value="criptos" sx={{ flexGrow: 1 }}>Criptomoedas</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>

                    {!showSkeletons && filteredQuotes.length === 0 && (
                        <Box sx={{ py: 6, textAlign: "center" }}>
                            <Typography sx={{ mb: 2 }}>Nenhuma moeda encontrada</Typography>
                            <Button variant="outlined" onClick={handleClearSearch}>
                                Limpar busca
                            </Button>
                        </Box>
                    )}

                    <Grid container spacing={2}>
                        {showSkeletons
                            ? CODES.map((code) => (
                                <Grid key={code} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Skeleton variant="rounded" height={156} />
                                </Grid>
                            ))
                            : filteredQuotes.map((quote) => (
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
