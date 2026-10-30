import { Box } from "@mui/material"

type LogoProps = {
    size?: number
}

function Logo({ size = 22 }: LogoProps){
    return (
        <Box sx={{ fontWeight: 800, fontSize: size}}>
            Cota<Box component="span" sx={{ color: 'primary.main'}}>fy</Box>
        </Box>
    )
}

export default Logo
