import React, { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Why } from './components/Why';
import { Team } from './components/Team';
import { Programs } from './components/Programs';
import { Stepper as BookingStepper } from './components/Booking/Stepper';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminModal } from './components/AdminModal';
import { Language } from './content';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('fa');
  const [adminOpen, setAdminOpen] = useState(false);
  const [preselectedAudience, setPreselectedAudience] = useState<string | undefined>();
  const [preselectedTopic, setPreselectedTopic] = useState<string | undefined>();

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

  const scrollToWhy = () => {
    const el = document.getElementById('why');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#0B1524] selection:bg-[#B45309] selection:text-white relative font-body">
      <AnimatedBackground />

      <Header
        currentLang={currentLang}
        onToggleLang={toggleLanguage}
        onBookClick={scrollToBooking}
      />

      <main className="flex-1 relative z-10">
        <Hero
          currentLang={currentLang}
          onBookClick={scrollToBooking}
          onModelClick={scrollToWhy}
        />

        <Why currentLang={currentLang} />

        <Team
          currentLang={currentLang}
          onSelectTrainer={handleSelectTrainer}
        />

        <Programs
          currentLang={currentLang}
          onRequestTopic={handleRequestTopic}
        />

        <BookingStepper
          currentLang={currentLang}
          preselectedAudience={preselectedAudience}
          preselectedTopic={preselectedTopic}
          onClearPreselections={() => {
            setPreselectedAudience(undefined);
            setPreselectedTopic(undefined);
          }}
        />

        <Faq currentLang={currentLang} />
      </main>

      <Footer
        currentLang={currentLang}
        onOpenAdmin={() => setAdminOpen(true)}
        onBookClick={scrollToBooking}
      />

      <FloatingWhatsApp
        currentLang={currentLang}
        onBookClick={scrollToBooking}
      />

      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
