import { Box } from "@mui/material"

type LogoProps = {
    size?: number
}

// Símbolo: moeda com gráfico de alta (mesmo desenho do public/favicon.svg)
function CoinMark({ size }: { size: number }) {
    return (
        <Box component="svg" viewBox="0 0 64 64" aria-hidden="true" sx={{ width: size, height: size, flexShrink: 0 }}>
            <circle cx="32" cy="32" r="30" fill="#FBBF24" />
            <circle cx="32" cy="32" r="24" fill="none" stroke="#241a00" strokeOpacity="0.3" strokeWidth="2" />
            <polyline points="15,43 25,32 34,39 46,25" fill="none" stroke="#241a00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="54,16 51.5,28.5 41.5,20" fill="#241a00" stroke="#241a00" strokeWidth="1.5" strokeLinejoin="round" />
        </Box>
    )
}

function Logo({ size = 22 }: LogoProps){
    return (
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.4 + 'px', fontWeight: 800, fontSize: size}}>
            <CoinMark size={Math.round(size * 1.35)} />
            <Box component="span">
                Cota<Box component="span" sx={{ color: 'primary.main'}}>fy</Box>
            </Box>
        </Box>
    )
}

export default Logo
