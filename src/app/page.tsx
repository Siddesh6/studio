import Header from '@/components/header';
import HeroSection from '@/components/sections/hero';
import IdeationSection from '@/components/sections/ideation';
import ProjectsSection from '@/components/sections/projects';
import SkillsSection from '@/components/sections/skills';
import ExperienceSection from '@/components/sections/experience';
import EducationSection from '@/components/sections/education';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/footer';
import GallerySection from '@/components/sections/gallery';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <IdeationSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
