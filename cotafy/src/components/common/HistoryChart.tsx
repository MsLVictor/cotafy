import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import type { ItemHistorico } from "./HistoryTable";

type HistoryChartProps = {
  itens: ItemHistorico[];
};

function HistoryChart({ itens }: HistoryChartProps) {
  // a API devolve do mais recente para o mais antigo; o gráfico lê da esquerda para a direita
  const ordenados = [...itens].reverse();

  const datas = ordenados.map((item) =>
    new Date(Number(item.timestamp) * 1000).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }),
  );
  const valores = ordenados.map((item) => Number(item.bid));

  return (
    <Box sx={{ width: "100%" }}>
      <LineChart
        height={320}
        xAxis={[{ scaleType: "point", data: datas }]}
        series={[{ data: valores, label: "Compra (R$)" }]}
      />
    </Box>
  );
}

export default HistoryChart;
