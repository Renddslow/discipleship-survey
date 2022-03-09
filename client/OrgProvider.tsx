import React, { FC, useContext, useEffect, useState } from 'react';

type Organization = {
  name: string;
  shortName: string | null;
  logo: string | null;
  color: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
  denomination: string;
};

type OrgContextType = {
  org: Organization | null;
  isLoading: boolean;
};

const OrgContext = React.createContext<OrgContextType>({} as OrgContextType);

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

const OrgProvider: FC = (props) => {
  const [org, setOrg] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!org) {
      setIsLoading(true);
      fetch('/api')
        .then((d) => d.json())
        .then((d) => {
          setOrg(d.data.attributes);
          // Adding 1s delay to prevent flashing
          return wait(1000);
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <OrgContext.Provider
      value={{
        org,
        isLoading,
      }}
    >
      {props.children}
    </OrgContext.Provider>
  );
};

export default OrgProvider;

export const useOrganization = () => {
  return useContext(OrgContext);
};
