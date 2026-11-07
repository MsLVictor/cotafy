import { useEffect, useState } from "react";
import { Button, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PageContainer from "../components/common/PageContainer";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { getQuotes } from "../services/api";

const MOEDAS = ["BRL", "USD", "EUR", "GBP", "ARS", "BTC"] as const
const ATALHOS = [10, 100, 1000, 10000]

type Moeda = (typeof MOEDAS)[number]

type Cotacao = {
    chave: string
    taxa: number | null
    erro: string
}

// Aceita "1.250,50" (ponto de milhar + vírgula decimal) e também "12.5"
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
            <Stack spacing={2} sx={{ maxWidth: 560 }}>
                <TextField
                    label="Valor"
                    value={valor}
                    onChange={(event) => setValor(event.target.value)}
                    inputMode="decimal"
                    error={Boolean(erroValor)}
                    helperText={erroValor}
                    fullWidth
                />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                        select
                        label="De"
                        value={de}
                        onChange={(event) => setDe(event.target.value as Moeda)}
                        sx={{ flex: 1 }}
                    >
                        {MOEDAS.map((moeda) => (
                        <MenuItem key={moeda} value={moeda}>
                            {moeda}
                        </MenuItem>
                        ))}
                    </TextField>
                    <IconButton
                        aria-label="Inverter moedas"
                        onClick={inverter}
                        sx={{ alignSelf: "center" }}
                    >
                        <SwapHorizIcon />
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
                            {moeda}
                        </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                    {ATALHOS.map((atalho) => (
                        <Button
                        key={atalho}
                        variant="outlined"
                        size="small"
                        onClick={() => setValor(String(atalho))}
                        >
                        {atalho.toLocaleString("pt-BR")}
                        </Button>
                    ))}
                </Stack>

                {erro ? (
                    <ErrorMessage message={erro} onRetry={tentarNovamente} />
                ) : carregando ? (
                    <Loading message="Buscando cotação..." />
                ) : (
                    <Stack spacing={0.5} sx={{ pt: 2 }}>
                        <Typography variant="h4" component="p" sx={{ fontWeight: 800 }}>
                            {resultado === null ? "—" : formatarMoeda(resultado, para)}
                        </Typography>
                        {valorNumerico !== null && taxa !== null && (
                            <Typography variant="body2" color="text.secondary">
                                1 {de} = {formatarMoeda(taxa, para)}
                            </Typography>
                        )}
                    </Stack>
                )}
            </Stack>
        </PageContainer>
    )
}

export default ConverterPage