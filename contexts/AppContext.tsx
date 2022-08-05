import React, { createContext, useContext, useState } from "react";
import { Tenant } from "../types/Tenant";

type AppContextType = {
  tenant: Tenant | null;
  setTenant: (newTenant: Tenant) => void;
};

const defaultValues: AppContextType = {
  tenant: null,
  setTenant: () => null
};

const appContext = createContext<AppContextType>(defaultValues);

export const useAppContext = () => {
  return useContext(appContext);
};

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);

  return (
    <appContext.Provider value={{ tenant, setTenant }}>
      {children}
    </appContext.Provider>
  );
};
