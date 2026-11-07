import { useEffect, useState } from "react";
import {
    Box,
    Card,
    Chip,
    Grid,
    Grow,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PageContainer from "../components/common/PageContainer";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { getQuotes } from "../services/api";

const MOEDAS = ["BRL", "USD", "EUR", "GBP", "ARS", "BTC"] as const
const ATALHOS = [10, 100, 1000, 10000]

type Moeda = (typeof MOEDAS)[number]

const INFO_MOEDA: Record<Moeda, { nome: string; icone: string }> = {
    BRL: { nome: "Real brasileiro", icone: "🇧🇷" },
    USD: { nome: "Dólar americano", icone: "🇺🇸" },
    EUR: { nome: "Euro", icone: "🇪🇺" },
    GBP: { nome: "Libra esterlina", icone: "🇬🇧" },
    ARS: { nome: "Peso argentino", icone: "🇦🇷" },
    BTC: { nome: "Bitcoin", icone: "₿" },
}

type Cotacao = {
    chave: string
    taxa: number | null
    erro: string
}

function validarValor(texto: string): { valor: number | null; erro: string } {
    const limpo = texto.trim()
    if (!limpo) return { valor: null, erro: "Informe um valor" }

    const normalizado = limpo.includes(",")
        ? limpo.replace(/\./g, "").replace(",", ".")
        : limpo

    const numero = Number(normalizado)
    if (!Number.isFinite(numero)) return { valor: null, erro: "Digite apenas números" }
    if (numero < 0) return { valor: null, erro: "O valor não pode ser negativo" }

    return { valor: numero, erro: "" }
}

function formatarMoeda(valor: number, moeda: string) {
    if (moeda === "BRL") {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        })
    }
    return `${valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
    })} ${moeda}`
}

function ConverterPage(){
    const [valor, setValor] = useState("1")
    const [de, setDe] = useState<Moeda>("BRL")
    const [para, setPara] = useState<Moeda>("USD")
    const [cotacao, setCotacao] = useState<Cotacao>({ chave: "", taxa: null, erro: "" })
    const [tentativa, setTentativa] = useState(0)
    const [girado, setGirado] = useState(false)

    const { valor: valorNumerico, erro: erroValor } = validarValor(valor)

    const mesmaMoeda = de === para
    const chave = `${de}-${para}-${tentativa}`

    useEffect(() => {
        if (de === para) return

        let ignore = false

        getQuotes([`${de}-${para}`])
            .then(([resultado]) => {
                if (!ignore) setCotacao({ chave, taxa: Number(resultado.bid), erro: "" })
            })
            .catch((err: Error) => {
                if (!ignore) setCotacao({ chave, taxa: null, erro: err.message })
            })

        return () => {
            ignore = true
        }
    }, [de, para, chave])

    function inverter() {
        setDe(para)
        setPara(de)
        setGirado((atual) => !atual)
    }

    function tentarNovamente() {
        setTentativa((atual) => atual + 1)
    }

    const pronto = mesmaMoeda || cotacao.chave === chave
    const taxa = mesmaMoeda ? 1 : pronto ? cotacao.taxa : null
    const erro = mesmaMoeda ? "" : pronto ? cotacao.erro : ""
    const carregando = !mesmaMoeda && !pronto

    const resultado =
        valorNumerico !== null && taxa !== null ? valorNumerico * taxa : null

    return (
        <PageContainer title="Conversor de moedas" subtitle="Converta valores entre moedas">
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: "stretch" }}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card variant="outlined" sx={{ height: "100%", p: { xs: 2.5, md: 3 } }}>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Valor"
                                value={valor}
                                onChange={(event) => setValor(event.target.value)}
                                inputMode="decimal"
                                error={Boolean(erroValor)}
                                helperText={erroValor || "Use vírgula para centavos"}
                                fullWidth
                                sx={{ "& input": { fontSize: "1.5rem", fontWeight: 700 } }}
                            />

                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1.5}
                                sx={{ alignItems: { sm: "center" } }}
                            >
                                <TextField
                                    select
                                    label="De"
                                    value={de}
                                    onChange={(event) => setDe(event.target.value as Moeda)}
                                    sx={{ flex: 1 }}
                                >
                                    {MOEDAS.map((moeda) => (
                                        <MenuItem key={moeda} value={moeda}>
                                            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                                <span>{INFO_MOEDA[moeda].icone}</span>
                                                <span>{moeda}</span>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <IconButton
                                    aria-label="Inverter moedas"
                                    onClick={inverter}
                                    sx={{
                                        alignSelf: "center",
                                        bgcolor: "primary.main",
                                        color: "primary.contrastText",
                                        border: 4,
                                        borderColor: "background.paper",
                                        "&:hover": { bgcolor: "primary.dark" },
                                    }}
                                >
                                    <SwapHorizIcon
                                        sx={{
                                            transition: "transform 0.4s ease",
                                            transform: girado ? "rotate(180deg)" : "rotate(0deg)",
                                        }}
                                    />
                                </IconButton>

                                <TextField
                                    select
                                    label="Para"
                                    value={para}
                                    onChange={(event) => setPara(event.target.value as Moeda)}
                                    sx={{ flex: 1 }}
                                >
                                    {MOEDAS.map((moeda) => (
                                        <MenuItem key={moeda} value={moeda}>
                                            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                                <span>{INFO_MOEDA[moeda].icone}</span>
                                                <span>{moeda}</span>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Typography variant="caption" color="text.secondary">
                                {INFO_MOEDA[de].nome} → {INFO_MOEDA[para].nome}
                            </Typography>

                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ display: "block", mb: 1 }}
                                >
                                    Valores rápidos
                                </Typography>
                                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                                    {ATALHOS.map((atalho) => {
                                        const selecionado = valor === String(atalho)
                                        return (
                                            <Chip
                                                key={atalho}
                                                label={atalho.toLocaleString("pt-BR")}
                                                color={selecionado ? "primary" : "default"}
                                                variant={selecionado ? "filled" : "outlined"}
                                                onClick={() => setValor(String(atalho))}
                                                sx={{ fontWeight: 600 }}
                                            />
                                        )
                                    })}
                                </Stack>
                            </Box>
                        </Stack>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <Card
                        variant="outlined"
                        sx={{
                            height: "100%",
                            p: { xs: 2.5, md: 3 },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: 1.5,
                            background:
                                "linear-gradient(160deg, rgba(45, 212, 191, 0.14), rgba(19, 28, 46, 0.35) 60%)",
                        }}
                    >
                        <Typography variant="overline" color="text.secondary">
                            Resultado
                        </Typography>

                        {erro ? (
                            <ErrorMessage message={erro} onRetry={tentarNovamente} />
                        ) : carregando ? (
                            <Loading message="Buscando cotação..." />
                        ) : (
                            <>
                                <Grow in key={String(resultado)}>
                                    <Typography
                                        variant="h3"
                                        component="p"
                                        sx={{
                                            fontWeight: 800,
                                            letterSpacing: "-0.02em",
                                            color: "primary.main",
                                        }}
                                    >
                                        {resultado === null ? "—" : formatarMoeda(resultado, para)}
                                    </Typography>
                                </Grow>

                                {valorNumerico !== null && taxa !== null && (
                                    <Chip
                                        label={`1 ${de} = ${formatarMoeda(taxa, para)}`}
                                        variant="outlined"
                                        size="small"
                                        sx={{ alignSelf: "flex-start" }}
                                    />
                                )}
                            </>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </PageContainer>
    )
}

export default ConverterPage