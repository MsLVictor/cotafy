import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export type ItemHistorico = {
  timestamp: string;
  bid: string;
  ask: string;
  high: string;
  low: string;
  pctChange: string;
};

type HistoryTableProps = {
  itens: ItemHistorico[];
};

const formatarReal = (valor: string) =>
  Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

function HistoryTable({ itens }: HistoryTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="Histórico dos últimos 7 dias">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell align="right">Compra</TableCell>
            <TableCell align="right">Venda</TableCell>
            <TableCell align="right">Máxima</TableCell>
            <TableCell align="right">Mínima</TableCell>
            <TableCell align="right">Variação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itens.map((item) => {
            const variacao = Number(item.pctChange);
            const positiva = variacao >= 0;

            return (
              <TableRow key={item.timestamp}>
                <TableCell>
                  {new Date(Number(item.timestamp) * 1000).toLocaleDateString(
                    "pt-BR",
                  )}
                </TableCell>
                <TableCell align="right">{formatarReal(item.bid)}</TableCell>
                <TableCell align="right">{formatarReal(item.ask)}</TableCell>
                <TableCell align="right">{formatarReal(item.high)}</TableCell>
                <TableCell align="right">{formatarReal(item.low)}</TableCell>
                <TableCell
                  align="right"
                  sx={{ color: positiva ? "success.main" : "error.main" }}
                >
                  <Typography
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    {positiva ? (
                      <ArrowUpwardIcon fontSize="small" />
                    ) : (
                      <ArrowDownwardIcon fontSize="small" />
                    )}
                    {variacao.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    %
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HistoryTable;
