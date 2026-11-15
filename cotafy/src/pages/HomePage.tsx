import PageContainer from '../components/common/PageContainer'
import CtaSection from '../components/home/CtaSection'
import FeaturesSection from '../components/home/FeatureSection'
import HeroSection from '../components/home/HeroSection'
import HighlightsSection from '../components/home/HighlightsSection'
import TeamSection from '../components/home/TeamSection'

function HomePage() {
    return (
        <PageContainer>
            <HeroSection />
            <HighlightsSection />
            <FeaturesSection />
            <TeamSection />
            <CtaSection />
        </PageContainer>  
    )
}

export default HomePage
