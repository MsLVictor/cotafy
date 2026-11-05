import { Box } from "@mui/material"

type LogoProps = {
    size?: number
}

function Logo({ size = 22 }: LogoProps){
    return (
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, fontWeight: 800, fontSize: size }}>
            <Box component="img" src="/favicon.svg" alt="" sx={{ width: size * 1.35, height: size * 1.35 }}/>
            <Box sx={{ fontWeight: 800, fontSize: size}}>
                Cota<Box component="span" sx={{ color: 'primary.main'}}>fy</Box>
            </Box>
        </Box>
    )
}

export default Logo
