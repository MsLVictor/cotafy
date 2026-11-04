import { useState } from "react";
import { Button, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PageContainer from "../components/common/PageContainer";

const MOEDAS = ["BRL", "USD", "EUR", "GBP", "ARS", "BTC"] as const
const ATALHOS = [10, 100, 1000, 10000]

type Moeda = (typeof MOEDAS)[number]

function ConverterPage(){
    const [valor, setValor] = useState("1")
    const [de, setDe] = useState<Moeda>("BRL")
    const [para, setPara] = useState<Moeda>("USD")
    
    function inverter() {
        setDe(para)
        setPara(de)
    }

    return (
        <PageContainer title="Conversor de moedas" subtitle="Converta valores entre moedas">
            <Stack spacing={2} sx={{ maxWidth: 560 }}>
                <TextField
                    label="Valor"
                    value={valor}
                    onChange={(event) => setValor(event.target.value)}
                    inputMode="decimal"
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
            </Stack>
        </PageContainer>
    )
}

export default ConverterPage
