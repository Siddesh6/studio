
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { personalData as defaultPersonalData } from '@/lib/data';

type PersonalData = typeof defaultPersonalData;

type PersonalDataContextType = {
  personalData: PersonalData;
  setPersonalData: (data: PersonalData) => void;
};

const PersonalDataContext = createContext<PersonalDataContextType>({
  personalData: defaultPersonalData,
  setPersonalData: () => {},
});

export const usePersonalData = () => useContext(PersonalDataContext);

export const PersonalDataProvider = ({ children }: { children: ReactNode }) => {
  const [personalData, setPersonalDataState] = useState<PersonalData>(defaultPersonalData);

  useEffect(() => {
    const storedData = localStorage.getItem('personalData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Deep merge stored data with defaults to avoid breaking if the structure changes
        const mergedData = {
          ...defaultPersonalData,
          ...parsedData,
          contact: {
            ...defaultPersonalData.contact,
            ...parsedData.contact,
          },
          socials: parsedData.socials || defaultPersonalData.socials,
        };
        setPersonalDataState(mergedData);
      } catch (e) {
        console.error("Failed to parse personal data from localStorage", e);
        setPersonalDataState(defaultPersonalData);
      }
    }
  }, []);

  const setPersonalData = (newData: PersonalData) => {
    setPersonalDataState(newData);
    try {
      localStorage.setItem('personalData', JSON.stringify(newData));
    } catch (e) {
        console.error("Failed to save personal data to localStorage", e);
    }
  };

  return (
    <PersonalDataContext.Provider value={{ personalData, setPersonalData }}>
      {children}
    </PersonalDataContext.Provider>
  );
};
