import { Box, Button, Typography } from "@mui/material";
import PageContainer from "../components/common/PageContainer";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <PageContainer>
            <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
                <Typography variant="h3" component="h1" color="primary">
                    404
                </Typography>
                <Typography variant="h5" component="p" sx={{ mt: 2, fontWeight: 600 }}>
                    Página não encontrada

                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
                    O endereço que você tentou acessar não existe ou foi removido.
                </Typography>

                <Button variant="contained" component={Link} to="/">
                    Voltar ao início
                </Button>
            </Box>
        </PageContainer>
    )
}

export default NotFoundPage
