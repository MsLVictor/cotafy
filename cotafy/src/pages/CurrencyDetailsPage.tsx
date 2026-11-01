import { Button, Chip, Container, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

type Cotacao = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  pctChange: string;
  bid: string;
  ask: string;
};

type Status = "carregando" | "ok" | "nao-encontrada" | "erro";

function CurrencyDetailsPage() {
  const { codigo = "" } = useParams();
  const codigoMaiusculo = codigo.toUpperCase();
  const [cotacao, setCotacao] = useState<Cotacao | null>(null);
  const [status, setStatus] = useState<Status>("carregando");

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await fetch(
          `https://economia.awesomeapi.com.br/json/last/${codigoMaiusculo}-BRL`,
        );

        if (resposta.status === 404) {
          setStatus("nao-encontrada");
          return;
        }

        const dados = await resposta.json();
        setCotacao(dados[`${codigoMaiusculo}BRL`]);
        setStatus("ok");
      } catch {
        setStatus("erro");
      }
    }

    buscar();
  }, [codigoMaiusculo]);

  if (status === "carregando") {
    return <Typography>Carregando...</Typography>;
  }

  if (status === "nao-encontrada") {
    return <Typography>Moeda {codigoMaiusculo} não encontrada.</Typography>;
  }

  if (status === "erro" || !cotacao) {
    return <Typography>Não foi possível carregar a cotação.</Typography>;
  }

  const variacao = Number(cotacao.pctChange);
  const positiva = variacao >= 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component={RouterLink}
        to="/cotacoes"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Voltar às cotações
      </Button>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Chip label={cotacao.code} color="primary" sx={{ fontWeight: 800 }} />
        <div>
          <Typography variant="h2" component="h1">
            {cotacao.name.split("/")[0]}
          </Typography>
          <Typography color="text.secondary">
            {cotacao.code}/{cotacao.codein}
          </Typography>
        </div>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignItems: "baseline", mt: 3 }}>
        <Typography variant="h3" component="p" sx={{ fontWeight: 800 }}>
          {Number(cotacao.bid).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          })}
        </Typography>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: "center",
            color: positiva ? "success.main" : "error.main",
          }}
        >
          {positiva ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          <Typography sx={{ fontWeight: 700 }}>
            {variacao.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}

export default CurrencyDetailsPage;
