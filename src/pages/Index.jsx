
import { useAuthStore } from "../stores/useAuthStore";
import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/homepage/HeroSection";
import FeaturesSection from "../components/homepage/FeaturesSection";
import SuccessStoriesSection from "../components/homepage/SuccessStoriesSection";
import ProductShowcaseSection from "../components/homepage/ProductShowcaseSection";
import CTASection from "../components/homepage/CTASection";

const Index = () => {
  const { currentUser } = useAuthStore();

  return (
    <MainLayout>
      <HeroSection currentUser={currentUser} />
      <FeaturesSection />
      <SuccessStoriesSection />
      <ProductShowcaseSection />
      <CTASection currentUser={currentUser} />
    </MainLayout>
  );
};

export default Index;
