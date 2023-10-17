import { createContext } from 'react';

interface ValidatorContextType {
  setValidator: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ValidatorContext = createContext<ValidatorContextType | null>(null);
