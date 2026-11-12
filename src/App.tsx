// Shams Teacher Empowerment Center App - Build Release v1.0.1
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { Why } from './components/Why';
import { OrbitModel } from './components/OrbitModel';
import { Audiences } from './components/Audiences';
import { Programs } from './components/Programs';
import { Quality } from './components/Quality';
import { Results } from './components/Results';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { Stepper as BookingStepper } from './components/Booking/Stepper';
import { Faq } from './components/Faq';
import { CtaBand } from './components/CtaBand';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminModal } from './components/AdminModal';
import { Language } from './content';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('fa');
  const [adminOpen, setAdminOpen] = useState(false);
  const [preselectedAudience, setPreselectedAudience] = useState<string | undefined>();
  const [preselectedTopic, setPreselectedTopic] = useState<string | undefined>();

  // Sync HTML tag lang and dir attributes
  useEffect(() => {
    document.documentElement.lang = currentLang === 'fa' ? 'fa-AF' : 'en';
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
  }, [currentLang]);

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToModel = () => {
    const el = document.getElementById('model');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectAudience = (audienceTitle: string) => {
    setPreselectedAudience(audienceTitle);
    scrollToBooking();
  };

  const handleRequestTopic = (topicTitle: string) => {
    setPreselectedTopic(topicTitle);
    scrollToBooking();
  };

  const handleSelectTrainer = (trainerName: string) => {
    setPreselectedTopic(
      currentLang === 'fa'
        ? `هماهنگی سمینار یا مشوره با: ${trainerName}`
        : `Seminar/Consultation with: ${trainerName}`
    );
    scrollToBooking();
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#0B1524] selection:bg-[#B45309] selection:text-white relative font-body">
      
      {/* Dynamic Animated Solar & Celestial Canvas Background */}
      <AnimatedBackground />

      {/* Sticky Header with Animated Language Toggle */}
      <Header
        currentLang={currentLang}
        onToggleLang={toggleLanguage}
        onBookClick={scrollToBooking}
      />

      {/* Main Content with Animated Language Transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentLang}
          initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 relative z-10"
        >
          {/* Hero Section */}
          <Hero
            currentLang={currentLang}
            onBookClick={scrollToBooking}
            onModelClick={scrollToModel}
          />

          {/* Trust Strip */}
          <TrustStrip currentLang={currentLang} />

          {/* Why Shams */}
          <Why currentLang={currentLang} />

          {/* The Model (4-Stage Cycle) */}
          <OrbitModel currentLang={currentLang} />

          {/* Faculty & Team */}
          <Team
            currentLang={currentLang}
            onSelectTrainer={handleSelectTrainer}
          />

          {/* Audiences */}
          <Audiences
            currentLang={currentLang}
            onSelectAudience={handleSelectAudience}
          />

          {/* Programs & Topics */}
          <Programs
            currentLang={currentLang}
            onRequestTopic={handleRequestTopic}
          />

          {/* Quality Assurance */}
          <Quality currentLang={currentLang} />

          {/* Expected Results */}
          <Results currentLang={currentLang} />

          {/* Roadmap */}
          <Roadmap currentLang={currentLang} />

          {/* Interactive Booking System */}
          <BookingStepper
            currentLang={currentLang}
            preselectedAudience={preselectedAudience}
            preselectedTopic={preselectedTopic}
            onClearPreselections={() => {
              setPreselectedAudience(undefined);
              setPreselectedTopic(undefined);
            }}
          />

          {/* FAQ */}
          <Faq currentLang={currentLang} />

          {/* Final CTA Band */}
          <CtaBand
            currentLang={currentLang}
            onBookClick={scrollToBooking}
          />
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenAdmin={() => setAdminOpen(true)}
        onBookClick={scrollToBooking}
      />

      {/* Floating WhatsApp and Sticky Mobile Bar */}
      <FloatingWhatsApp
        currentLang={currentLang}
        onBookClick={scrollToBooking}
      />

      {/* Local Admin Passcode Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

    </div>
  );
}
