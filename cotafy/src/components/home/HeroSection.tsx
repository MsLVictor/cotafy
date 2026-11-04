import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <Box component="section" sx={{ py: { xs: 2, md: 4 } }}>
            <Stack spacing={3} sx={{ maxWidth: 500 }}>
                <Chip 
                    icon={<CircleIcon />}
                    label="Cotações em tempo real"
                    color="primary"
                    variant="outlined"
                    sx={{ 
                            alignSelf: 'flex-start',
                            borderColor: 'rgba(45, 212, 191, 0.35)',
                            fontWeight: 600,
                            '& .MuiChip-icon': { fontSize: 8, ml: 1.5 },
                        }}
                />
                <Typography variant="h1" sx={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    Acompanhe o dólar, o euro e o bitcoin{' '}
                    <Box component="span" sx={{ color: 'primary.main' }}>
                        sem complicação
                    </Box>
                </Typography>

                <Typography 
                    color="textSecondary"
                    sx={{ fontSize: '1.125rem', lineHeight: 1.6 }}>
                    Veja as cotações do dia, consulte o histórico de cada moeda e converta valores em segundos. Tudo em reais, num só lugar.
                </Typography>
                
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={1.5}>
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/cotacoes"
                        sx={{ px: 3.5, py: 1.5, fontSize: '1rem', fontWeight: 700 }}
                    >
                        Ver cotações
                    </Button>
                    
                    <Button
                        variant="outlined"
                        size="large"
                        component={Link}
                        to="/conversor"
                        sx={{ 
                                px: 3.5, py: 1.5,
                                fontSize: '1rem',
                                 color: 'text.primary', 
                                 borderColor: 'rgba(148, 163, 184, 0.4)'
                            }}
                    >
                        Converter valores
                    </Button>
                    
                </Stack>

            </Stack>
        </Box>
    )
}

export default HeroSection
