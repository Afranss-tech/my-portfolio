import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HomeSection from "./components/sections/HomeSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import Certeficate from "./components/sections/Certeficate";
import ResumeSection from "./components/sections/ResumeSection";
import PortfolioSection from "./components/sections/PortfolioSection";
import ServiceSection from "./components/sections/ServiceSection";
import ContactSection from "./components/sections/ContactSection";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll to section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Static profile data
  const profile = {
    skills: [
      { name: "React", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "CSS", level: "Intermediate" },
    ],
    projects: [
      { title: "Project 1", description: "Description 1" },
      { title: "Project 2", description: "Description 2" },
    ],
    services: [
      { title: "Web Development", description: "Fullstack web apps" },
    ],
    contact: {
      email: "example@mail.com",
      phone: "+123456789",
    },
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Main content */}
      <main className="ml-64 w-full">
        <HomeSection />
        <AboutSection profile={profile} />
        <SkillsSection skills={profile.skills} />
        <ResumeSection />
        <Certeficate />
        <PortfolioSection projects={profile.projects} />
        <ServiceSection services={profile.services} />
        <ContactSection contact={profile.contact} />
      </main>
    </div>
  );
}

export default App;
