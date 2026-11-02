import { Box, CircularProgress, Typography } from "@mui/material"


type LoadingProps = {
    message?: string
}

function Loading({message = 'Carregando...'}: LoadingProps) {
    return (
        <Box role="status" sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
            <CircularProgress />
            <Typography color="text.secondary">{message}</Typography>
        </Box>
    )
}

export default Loading
