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

function CurrencyDetailsPage() {
  const { codigo = "" } = useParams();
  const codigoMaiusculo = codigo.toUpperCase();
  const [cotacao, setCotacao] = useState<Cotacao | null>(null);

  useEffect(() => {
    async function buscar() {
      const resposta = await fetch(
        `https://economia.awesomeapi.com.br/json/last/${codigoMaiusculo}-BRL`,
      );

      const dados = await resposta.json();
      setCotacao(dados[`${codigoMaiusculo}BRL`]);
    }

    buscar();
  }, [codigoMaiusculo]);

  if (!cotacao) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Typography variant="h2">
      {cotacao.code}/{cotacao.codein}: R$ {cotacao.bid}
    </Typography>
  );
}

export default CurrencyDetailsPage;
