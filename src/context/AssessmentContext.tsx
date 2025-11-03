import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AssessmentResult {
  personality: string;
  interests: string[];
  skills: string[];
  careerMatches: CareerMatch[];
}

interface CareerMatch {
  title: string;
  match: number;
  description: string;
  requirements: string[];
  roadmap: string[];
  salary: string;
  growth: string;
}

interface AssessmentContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  answers: Record<string, any>;
  setAnswers: (answers: Record<string, any>) => void;
  results: AssessmentResult | null;
  setResults: (results: AssessmentResult) => void;
  savedCareers: CareerMatch[];
  setSavedCareers: (careers: CareerMatch[]) => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [savedCareers, setSavedCareers] = useState<CareerMatch[]>([]);

  return (
    <AssessmentContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        answers,
        setAnswers,
        results,
        setResults,
        savedCareers,
        setSavedCareers,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
}