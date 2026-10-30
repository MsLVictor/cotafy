import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { navLinks } from "./navLinks";
import { NavLink } from "react-router-dom";
function Navbar() {
    return (
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ bgcolor: 'rgba(11, 18, 32, 0.92)', borderBottom: 1, borderColor: 'divider' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ fontWeight: 800, fontSize: 22 }}>
                        Cota<Box component="span" sx={{ color: 'primary.main' }}>fy</Box>
                    </Box>

                    <Box component="nav" aria-label="Navegação principal" sx={{ display: 'flex', gap: 0.5 }}>
                        {navLinks.map((link) => (
                            <Button key={link.to} component={NavLink} to={link.to} end={link.to === '/'} sx={{
                                color: 'text.secondary', '&.active': { color: 'primary.main', bgcolor: 'rgba(45,212, 191, 0.1)' },
                            }}>
                                {link.label}
                            </Button>
                        ))}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar
