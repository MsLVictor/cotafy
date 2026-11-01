import { Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type MoedaNaoEncontradaProps = {
  codigo: string;
};

function MoedaNaoEncontrada({ codigo }: MoedaNaoEncontradaProps) {
  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
        Moeda não encontrada
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Não encontramos nenhuma moeda com o código "{codigo}". Confira se o
        código está correto e tente novamente.
      </Typography>
      <Button component={RouterLink} to="/cotacoes" variant="contained">
        Ver cotações
      </Button>
    </Container>
  );
}

export default MoedaNaoEncontrada;
