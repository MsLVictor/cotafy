import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import type { ItemHistorico } from "./HistoryTable";

type HistoryChartProps = {
  itens: ItemHistorico[];
};

function HistoryChart({ itens }: HistoryChartProps) {
  const ordenados = [...itens].reverse();

  const datas = ordenados.map((item) =>
    new Date(Number(item.timestamp) * 1000).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }),
  );
  const valores = ordenados.map((item) => Number(item.bid));

  function formatarValor(valor: number) {
    return valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
      roundingMode: "ceil",
    });
  }

  return (
    <Box sx={{ width: "100%" }}>
      <LineChart
        height={320}
        xAxis={[{ scaleType: "point", data: datas }]}
        yAxis={[{ width: 80, valueFormatter: (valor: number) => formatarValor(valor) }]}
        series={[{ 
          data: valores, 
          label: "Compra (R$)",
          valueFormatter: (valor) => (valor === null ? "" : formatarValor(valor)), }]}
      />
    </Box>
  );
}

export default HistoryChart;
