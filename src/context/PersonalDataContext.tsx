
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  personalData as defaultPersonalData,
  projectsData as defaultProjectsData,
  skillsData as defaultSkillsData,
  experienceData as defaultExperienceData,
  educationData as defaultEducationData,
  galleryData as defaultGalleryData,
  publicationsData as defaultPublicationsData,
  socialIconMap
} from '@/lib/data';
import { LucideIcon } from 'lucide-react';

// Define types based on data structure
type Social = { id: string; name: string; url: string; icon: LucideIcon };
type PersonalDetails = Omit<typeof defaultPersonalData, 'socials'> & { socials: Social[] };
type Project = typeof defaultProjectsData[0];
type Skills = typeof defaultSkillsData;
type Experience = typeof defaultExperienceData[0];
type Education = typeof defaultEducationData[0];
type GalleryItem = typeof defaultGalleryData[0];
type Publication = typeof defaultPublicationsData[0];

export type PortfolioData = {
  details: PersonalDetails;
  projects: Project[];
  skills: Skills;
  experience: Experience[];
  education: Education[];
  gallery: GalleryItem[];
  publications: Publication[];
};

type PersonalDataContextType = {
  personalData: PortfolioData;
  setPersonalData: (data: PortfolioData) => void;
};

const defaultData: PortfolioData = {
  details: defaultPersonalData,
  projects: defaultProjectsData,
  skills: defaultSkillsData,
  experience: defaultExperienceData,
  education: defaultEducationData,
  gallery: defaultGalleryData,
  publications: defaultPublicationsData,
}

const PersonalDataContext = createContext<PersonalDataContextType>({
  personalData: defaultData,
  setPersonalData: () => {},
});

export const usePersonalData = () => useContext(PersonalDataContext);

export const PersonalDataProvider = ({ children }: { children: ReactNode }) => {
  const [personalData, setPersonalDataState] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    const storedData = localStorage.getItem('portfolioData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        
        // Re-hydrate icons for socials
        if (parsedData.details?.socials) {
          parsedData.details.socials.forEach((social: any) => {
            social.icon = socialIconMap[social.name] || socialIconMap['GitHub'];
          });
        }
        
        // Deep merge with defaults to prevent breakage if data structure changes
        const mergedData = {
          details: { ...defaultData.details, ...(parsedData.details || {}) },
          projects: parsedData.projects || defaultData.projects,
          skills: parsedData.skills || defaultData.skills,
          experience: parsedData.experience || defaultData.experience,
          education: parsedData.education || defaultData.education,
          gallery: parsedData.gallery || defaultData.gallery,
          publications: parsedData.publications || defaultData.publications,
        };

        setPersonalDataState(mergedData);
      } catch (e) {
        console.error("Failed to parse portfolio data from localStorage", e);
        setPersonalDataState(defaultData);
      }
    }
  }, []);

  const setPersonalData = (newData: PortfolioData) => {
    setPersonalDataState(newData);
    try {
      // Create a serializable version of the data without React components (icons)
      const serializableData = {
        ...newData,
        details: {
          ...newData.details,
          socials: newData.details.socials.map(({ icon, ...rest }) => rest),
        }
      };
      localStorage.setItem('portfolioData', JSON.stringify(serializableData));
    } catch (e) {
        console.error("Failed to save portfolio data to localStorage", e);
    }
  };

  return (
    <PersonalDataContext.Provider value={{ personalData, setPersonalData }}>
      {children}
    </PersonalDataContext.Provider>
  );
};
