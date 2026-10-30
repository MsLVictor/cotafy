import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useEffect } from "react";

function MainLayout() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathname])

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>

            <Footer />
        </Box>
    )
}

export default MainLayout
