import { Box, Card, Typography } from "@mui/material"
import type { ReactNode } from "react"

type FeatureCardProps = {
    icon: ReactNode
    title: string
    description: string
    color?: 'primary' | 'secondary'
}

function FeatureCard({icon, title, description, color = 'primary'} : FeatureCardProps){
    const tint = color === 'primary' ? 'rgba(45, 212, 191, 0.12)' : 'rgba(251, 191, 36, 0.12)'

    return (
        <Card variant="outlined" sx={{ height: '100%', p: 3.5, display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 1, bgcolor: tint, color: `${color}.main`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                {title}
            </Typography>
            <Typography color="textSecondary" sx={{ lineHeight: 1.6 }}>
                {description}
            </Typography>
        </Card>
    )
}

export default FeatureCard