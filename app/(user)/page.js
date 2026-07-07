import AuthModal from '@/components/auth/AuthModal';
import React from 'react'
import HeroSection from '@/components/home/HeroSection';
import BrandStrip from '@/components/home/BrandSection';
import FeatureCards from '@/components/home/PartnerSection';
import CategoriesSection from '@/components/home/CategoriesSection';

function HomePage() {
    return (
        <main className="min-h-screen bg-bg-page">
            <AuthModal />

            {/* Sections */}
            <HeroSection />
            <BrandStrip />
            <FeatureCards />
            <CategoriesSection />
        </main>
    )
}

export default HomePage;