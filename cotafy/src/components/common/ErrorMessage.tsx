import { Alert, Box, Button } from "@mui/material";

type ErrorMessageProps = {
    message: string
    onRetry?: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps){
    return (
        <Alert severity="error" variant="outlined" sx={{ my: 4}}>
            {message}
            {onRetry && (
                <Box sx={{ mt: 1.5 }}>
                    <Button variant="contained" color="error" onClick={onRetry}>
                        Tentar novamente
                    </Button>
                </Box>
            )}
        </Alert>
    )
}

export default ErrorMessage