import AuthModal from '@/components/auth/AuthModal';
import React from 'react'
import HeroSection from '../../components/home/HeroSection';

function HomePage() {
    return (
        <main className="min-h-screen bg-bg-page">
            <AuthModal/>

            {/* Sections */}
            <HeroSection/>
        </main>
    )
}

export default HomePage;