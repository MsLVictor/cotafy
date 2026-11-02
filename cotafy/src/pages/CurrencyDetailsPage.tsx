import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import ErrorMessage from "../components/common/ErrorMessage";
import HistoryChart from "../components/common/HistoryChart";
import HistoryTable, {
  type ItemHistorico,
} from "../components/common/HistoryTable";
import Loading from "../components/common/Loading";
import MoedaNaoEncontrada from "../components/common/MoedaNaoEncontrada";
import PageContainer from "../components/common/PageContainer";

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
  const [historico, setHistorico] = useState<ItemHistorico[]>([]);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    async function buscar() {
      try {
        // TODO: trocar por getQuotes([codigoMaiusculo]) do services/api.ts (#10)
        const resposta = await fetch(
          `https://economia.awesomeapi.com.br/json/last/${codigoMaiusculo}-BRL`,
        );

        if (resposta.status === 404) {
          setStatus("nao-encontrada");
          return;
        }

        const dados = await resposta.json();
        setCotacao(dados[`${codigoMaiusculo}BRL`]);

        // TODO: trocar por getHistory(codigoMaiusculo, 7) do services/api.ts (#10)
        const respostaHistorico = await fetch(
          `https://economia.awesomeapi.com.br/json/daily/${codigoMaiusculo}-BRL/7`,
        );
        setHistorico(await respostaHistorico.json());

        setStatus("ok");
      } catch {
        setStatus("erro");
      }
    }

    buscar();
  }, [codigoMaiusculo, tentativa]);

  function tentarNovamente() {
    setStatus("carregando");
    setTentativa((t) => t + 1);
  }

  if (status === "carregando") {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    );
  }

  if (status === "nao-encontrada") {
    return <MoedaNaoEncontrada codigo={codigoMaiusculo} />;
  }

  if (status === "erro" || !cotacao) {
    return (
      <PageContainer>
        <ErrorMessage
          message="Não foi possível carregar a cotação. Verifique sua conexão e tente novamente."
          onRetry={tentarNovamente}
        />
      </PageContainer>
    );
  }

  const variacao = Number(cotacao.pctChange);
  const positiva = variacao >= 0;

  const cartas = [
    { rotulo: "Compra", valor: cotacao.bid },
    { rotulo: "Venda", valor: cotacao.ask },
    { rotulo: "Máxima", valor: cotacao.high },
    { rotulo: "Mínima", valor: cotacao.low },
  ];

  return (
    <PageContainer>
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

      <Box
        sx={{
          display: "grid",
          gap: 2,
          mt: 4,
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        }}
      >
        {cartas.map((carta) => (
          <Card key={carta.rotulo}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {carta.rotulo}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {Number(carta.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h5" component="h2" sx={{ mt: 5, mb: 2 }}>
        Últimos 7 dias
      </Typography>
      <HistoryTable itens={historico} />

      <Typography variant="h5" component="h2" sx={{ mt: 5, mb: 2 }}>
        Evolução da compra
      </Typography>
      <HistoryChart itens={historico} />
    </PageContainer>
  );
}

export default CurrencyDetailsPage;
