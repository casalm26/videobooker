'use client';

import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

type BusinessContextValue = {
  activeBusinessId: string | null;
  setActiveBusinessId: (businessId: string | null) => void;
};

const BusinessContext = createContext<BusinessContextValue | undefined>(undefined);

type BusinessProviderProps = {
  defaultBusinessId?: string | null;
  children: ReactNode;
};

export function BusinessProvider({ defaultBusinessId = null, children }: BusinessProviderProps) {
  const [activeBusinessId, setActiveBusinessId] = useState<string | null>(defaultBusinessId);

  const value = useMemo(
    () => ({
      activeBusinessId,
      setActiveBusinessId,
    }),
    [activeBusinessId]
  );

  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
