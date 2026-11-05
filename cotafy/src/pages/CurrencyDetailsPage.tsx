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
import HistoryTable from "../components/common/HistoryTable";
import Loading from "../components/common/Loading";
import MoedaNaoEncontrada from "../components/common/MoedaNaoEncontrada";
import PageContainer from "../components/common/PageContainer";
import { getHistory, getQuotes } from "../services/api";
import type { HistoryItem, Quote } from "../types/type";


type Status = "carregando" | "ok" | "nao-encontrada" | "erro";

function CurrencyDetailsPage() {
  const { codigo = "" } = useParams();
  const codigoMaiusculo = codigo.toUpperCase();
  const [cotacao, setCotacao] = useState<Quote | null>(null);
  const [historico, setHistorico] = useState<HistoryItem[]>([]);
  const [status, setStatus] = useState<Status>("carregando");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    async function buscar() {
      try {
        const [cotacaoApi] = await getQuotes([`${codigoMaiusculo}-BRL`]);
        setCotacao(cotacaoApi);
        setHistorico(await getHistory(`${codigoMaiusculo}-BRL`, 7));
        setStatus("ok");
      } catch (erro) {
        const mensagem = erro instanceof Error ? erro.message : "";
        const naoAchou =
          mensagem.toLowerCase().includes("não encontrada") ||
          mensagem.toLowerCase().includes("nao encontrada") ||
          mensagem.toLowerCase().includes("coinnotexists");
        if (naoAchou) {
          setStatus("nao-encontrada");
          return;
        }
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
          <Typography color="textSecondary">
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
              <Typography variant="body2" color="textSecondary">
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
