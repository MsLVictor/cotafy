import PageContainer from '../components/common/PageContainer'
import FeaturesSection from '../components/home/FeatureSection'
import HeroSection from '../components/home/HeroSection'
import HighlightsSection from '../components/home/HighlightsSection'

function HomePage() {
    return (
        <PageContainer>
            <HeroSection />
            <HighlightsSection />
            <FeaturesSection />
        </PageContainer>  
    )
}

export default HomePage
