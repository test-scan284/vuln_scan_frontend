import React from 'react';

import { MainLayout } from '../components/layout/MainLayout.tsx';
import RotatingComponent from '../utils/Test.tsx';
import SelectM from '../components/SelectM.tsx';

export const Select = () => {
  return (
    <MainLayout>
      {/* Side gradient lines */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 via-cyan-400 to-green-400 animate-pulse z-10"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-green-400 via-cyan-400 to-fuchsia-500 animate-pulse z-10"></div>
      
      {/* Content */}
      <div className="relative flex flex-col md:flex-row items-start justify-between gap-20 px-4 m-auto py-12 bg-black text-white overflow-hidden">
        <div className="animate-float ">
          <SelectM
              title="Login as Free"
              description="Best way to be success in your life."
              list={["Set Clear Goals", "Stay Organized","Keep Software Updated",]}
              theme="free" 
              path="/free-plan"
            />  
        </div>
        <div className="animate-float delay-1000">
          <SelectM
            title="Login with Paid"
            description="Protect yourself online with these tips."
            list={[
              "Use Strong Passwords",
              "Enable 2FA",
              "Keep Software Updated",
              "Avoid Phishing Emails",
              "Backup Your Data",
            ]}
            theme="paid" 
            path="/paid-plan"
          />
        </div>
      </div>
    </MainLayout>
  );
};
