import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ResumeSection from './components/sections/ResumeSection';
import PortfolioSection from './components/sections/PortfolioSection';
import ServiceSection from './components/sections/ServiceSection';
import ContactSection from './components/sections/ContactSection';
import { MOCK_PROFILE } from './data/mockData';
import CertificateSection from "./components/sections/CertificateSection";


function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div className="flex">
      <div className="w-64 bg-gray-900 min-h-screen">
        <Sidebar profile={MOCK_PROFILE} activeSection={activeSection} scrollToSection={scrollToSection}/>
      </div>
      <div className="flex-1">
        <HomeSection profile={MOCK_PROFILE}/>
        <AboutSection profile={MOCK_PROFILE}/>
        <SkillsSection skills={MOCK_PROFILE.skills}/>
        <ResumeSection/>
        <CertificateSection/>
        <PortfolioSection projects={MOCK_PROFILE.projects}/>
        <ServiceSection services={MOCK_PROFILE.services}/>
        <ContactSection contact={MOCK_PROFILE.contact}/>
      </div>
    </div>
  );
}

export default App;
