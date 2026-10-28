import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2dd4bf',
            contrastText: '#241a00',
        },
        secondary: {
            main: '#FBBF24',
            contrastText: '#241a00',
        },
        background: {
            default: '#0B1220',
            paper: '#131c2e',
        },
        text: {
            primary: '#E6EDF7',
            secondary: '#94a3b8',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: '"Inter", system-ui, "Segoe UI", Roboto, sans-serif',
        h1: { fontSize: '2.75rem', fontWeight: 800 },
        h2: { fontSize: '2rem', fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 999 },
            },
        },
    },
})