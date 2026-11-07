import { Box, Grid, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import FeatureCard from "./FeatureCard";

const features = [
    {
        icon: <TrendingUpIcon />,
        title: 'Cotações atualizadas',
        description: 'Moedas e criptomoedas com valor de compra, venda e variação do dia.',
        color: 'primary',
    },
        {
        icon: <CalendarMonthIcon />,
        title: 'Histórico de 7 dias',
        description: 'Veja como cada moeda se comportou na última semana, dia a dia.',
        color: 'secondary',
    },
    {
        icon: <SwapHorizIcon />,
        title: 'Conversor rápido',
        description: 'Digite um valor e veja na hora quanto ele vale em outra moeda.',
        color: 'primary',
    },
] as const

function FeaturesSection(){
    return (
        <Box component="section" sx={{ pt: 7, pb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3.5 }}>
                <Typography variant="h2" sx={{ fontSize: '1.875rem', letterSpacing: '-0.01em' }}>
                    Por que usar o Cotafy
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, maxWidth: 560, mx: 'auto' }}>
                    Três coisas que o app faz bem, sem cadastro e sem anúncios.
                </Typography>
            </Box>

            <Grid container spacing={2.5}>
                {features.map((feature) => (
                    <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
                        <FeatureCard
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            color={feature.color}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default FeaturesSection
