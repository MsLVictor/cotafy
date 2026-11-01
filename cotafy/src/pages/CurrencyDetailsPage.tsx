import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  return (
    <Typography variant="h2">
      {cotacao.code}/{cotacao.codein}: R$ {cotacao.bid}
    </Typography>
  );
}

export default CurrencyDetailsPage;
