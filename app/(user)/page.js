import AuthModal from '@/components/auth/AuthModal';
import React from 'react'
import HeroSection from '@/components/home/HeroSection';
import BrandStrip from '@/components/home/BrandStrip';

function HomePage() {
    return (
        <main className="min-h-screen bg-bg-page">
            <AuthModal />

            {/* Sections */}
            <HeroSection />
            <BrandStrip />
        </main>
    )
}

export default HomePage;