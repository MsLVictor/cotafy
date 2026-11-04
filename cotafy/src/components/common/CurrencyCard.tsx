import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link as RouterLink } from "react-router-dom";

type CurrencyCardProps = {
  code: string;
  name: string;
  value: number;
  pctChange: number;
  to?: string;
};

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: value < 1 ? 4 : 2,
  }).format(value);
}

function CurrencyCard({ code, name, value, pctChange, to }: CurrencyCardProps) {
  const positive = pctChange >= 0;

  const cardContent = (
    <CardContent>
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center", flexWrap: "wrap" }}
      >
        <Chip
          label={code}
          color="primary"
          size="small"
          sx={{ fontWeight: 800 }}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {code}/BRL
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "baseline",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography variant="h5" component="p" sx={{ fontWeight: 800 }}>
            {formatBRL(value)}
        </Typography>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: "center",
            color: positive ? "success.main" : "error.main",
          }}
        >
          {positive ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          <Typography sx={{ fontWeight: 700 }}>
            {pctChange.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            })}
            %
          </Typography>
        </Stack>
      </Stack>
    </CardContent>
  );

  if (!to) {
    return <Card sx={{ height: "100%" }}>{cardContent}</Card>;
  }

  return (
    <Card
      sx={{
        height: "100%",
        border: 1,
        borderColor: "divider",
        transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={to}
        aria-label={`Ver detalhes de ${name}`}
        sx={{ height: "100%" }}
      >
        {cardContent}
      </CardActionArea>
    </Card>
  );
}

export default CurrencyCard;
