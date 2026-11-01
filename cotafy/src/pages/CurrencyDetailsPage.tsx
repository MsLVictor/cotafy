import { Typography } from "@mui/material";
import PageContainer from "../components/common/PageContainer";

function CurrencyDetailsPage(){
    return (
        <PageContainer title="Detalhes da moeda." subtitle="">
            <Typography color="text.secondary">Detalhes da moeda escolhida</Typography>
        </PageContainer>
    )
}

export default CurrencyDetailsPage