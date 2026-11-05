import { AppBar, Box, Button, Container, IconButton, Toolbar, Drawer, ListItemText, ListItemButton, List } from "@mui/material";
import { navLinks } from "./navLinks";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ bgcolor: 'rgba(11, 18, 32, 0.92)', borderBottom: 1, borderColor: 'divider' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Logo />

                    <Box component="nav" aria-label="Navegação principal" sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
                        {navLinks.map((link) => (
                            <Button key={link.to} component={NavLink} to={link.to} end={link.to === '/'} sx={{
                                color: 'text.secondary', '&.active': { color: 'primary.main', bgcolor: 'rgba(45,212, 191, 0.1)' },
                            }}>
                                {link.label}
                            </Button>
                        ))}
                    </Box>
                    <IconButton
                        aria-label="Abrir menu"
                        onClick={() => setOpen(true)}
                        sx={{ display: { xs: 'flex', md: 'none'} }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </Container>
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 260, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                        <Logo />
                        <IconButton aria-label="Fechar menu" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List component="nav" aria-label="Navegação principal">
                        {navLinks.map((link) => (
                            <ListItemButton
                                key={link.to}
                                component={NavLink}
                                to={link.to}
                                end={link.to === '/'}
                                onClick={() => setOpen(false)}
                                sx={{ borderRadius: 2, '&.active': {color: 'primary.main', bgcolor: 'rgba(45, 212, 191, 0.1)'} }}
                            >
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    )
}

export default Navbar
