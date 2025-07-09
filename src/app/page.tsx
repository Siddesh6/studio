import Header from '@/components/header';
import ProjectsSection from '@/components/sections/projects';
import SkillsSection from '@/components/sections/skills';
import ExperienceSection from '@/components/sections/experience';
import EducationSection from '@/components/sections/education';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/footer';
import GallerySection from '@/components/sections/gallery';
import PublicationsSection from '@/components/sections/publications';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <GallerySection />
        <PublicationsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
