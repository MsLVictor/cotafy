import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";


function CtaSection() {
    return (
        <Box component="section" sx={{ pt: 7, pb: 3 }}>
            <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 3, md: 5 }, borderRadius: '20px', bgcolor: 'background.paper', border: 1, borderColor: 'rgba(45, 212, 191, 0.3)', display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center', justifyContent: 'space-between'}}>
                <Box sx={{ flex: '1 1 380px', minWidth: 0 }}>
                    <Typography variant="h2" sx={{ fontSize: '1.75rem'}}>
                        Pronto para acompanhar o mercado?
                    </Typography>
                    <Typography color="textSecondary" sx={{ mt: 1 }}>
                        Veja agora as cotações do dia ou converta um valor.
                    </Typography>
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                    <Button variant="contained" size="large" component={Link} to= "/cotacoes" sx={{ px: 3.5, py: 1.5, fontSize: '1rem', fontWeight: 700 }}>
                        Ver cotações
                    </Button>
                    <Button variant="outlined" size="large" component={Link} to="/conversor" sx={{ px: 3.5, py: 1.5, fontSize: '1rem', color: 'text.primary', borderColor: 'rgba(148, 163, 184, 0.4)' }}>
                        Abrir conversor
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default CtaSection
