import { Box, Container, Typography } from "@mui/material"
import type { ReactNode } from "react"

type PageContainerProps = {
    title?: string
    subtitle?: string
    children: ReactNode
}

function PageContainer({ title, subtitle, children }: PageContainerProps) {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            {title && (
                <Box sx={{ mb: 4 }}>
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography color="textSecondary" sx={{ mt: 1 }}>
                            {subtitle}
                        </Typography>
                    )}
                </Box>
            )} 
            {children}
        </Container>
    )
}

export default PageContainer
