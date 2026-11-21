import { Box, Grid, Typography } from "@mui/material"
import MemberCard from "./MemberCard"

const members = [
    { name: 'Victor Melquiades Leite', role: 'Home', description: 'Página inicial, menu, layout e componentes de carregamento e erro.' },
    { name: 'Alexandre Chaves Martins', role: 'Cotações', description: 'Lista de cotações, busca, filtros e serviço da API.' },
    { name: 'Luana Patrícia Gomes da Silva', role: 'Detalhes', description: 'Página da moeda, histórico de 7 dias e gráfico.' },
    { name: 'Hrasam Hussem Gomes Monteiro', role: 'Conversor', description: 'Conversor de moedas e card de cotação.' },
]

function TeamSection(){
    return (
        <Box component="section" sx={{ pt: 7, pb: 4 }}>
            <Box sx={{textAlign: 'center', mb: 3.5 }}>
                <Typography variant="h2" sx={{ fontSize: '1.875rem', letterSpacing: '-0.01em'}}>
                    Equipe
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1 }}>
                    Quem fez o Cotafy e o que cada um desenvolveu.
                </Typography>
            </Box>
            <Grid container spacing={2.5}>
                {members.map((member) => (
                    <Grid key={member.name} size={{ xs:12, sm:6, md: 3}}>
                        <MemberCard name={member.name} role={member.role} description={member.description}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default TeamSection