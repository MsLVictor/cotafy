import { Box, Container, Typography } from "@mui/material";
import Logo from "./Logo";


function Footer() {
    return (
        <Box component="footer" sx={{ textAlign: 'center',borderTop: 1, borderColor: 'divider', mt: 8 }}>
            <Container maxWidth="lg" sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                    <Logo size={18} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75}}>
                        Projeto da disciplina Tecnologia para Frontend Avançado.
                    </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                    © 2026 Cotafy. Cotações fornecidas pela AwesomeAPI.
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer

