import { Avatar, Card, Chip, Typography } from "@mui/material";

type MemberCardProps = {
    name: string
    role: string
    description: string
    avatar?: string
}

function getInitials(name: string) {
    const parts = name.split(" ")
    return parts[0][0] + parts[parts.length - 1][0]
}

function MemberCard({ name, role, description, avatar }: MemberCardProps){
    return (
        <Card variant="outlined" sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center'}}>
            <Avatar src={avatar} sx={{ width: 72, height: 72, bgcolor: '#1E2A40', color: 'primary.main', border: 2, borderColor: 'rgba(45, 212, 191, 0.5)', fontWeight: 700, fontSize: 22 }}>
                {getInitials(name)}
            </Avatar>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: '1.0625rem' }}>
                {name}
            </Typography>
            <Chip label={role} size="small" sx={{ bgcolor: 'rgba(45, 212, 191, 0.1)', color: 'primary.main', fontWeight: 600 }}/>
            <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.5 }}>
                {description}
            </Typography>
        </Card>
    )
}

export default MemberCard
