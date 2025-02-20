
import { useState } from 'react';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [selectedClientId, setSelectedClientId] = useState(1);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar onClientSelect={setSelectedClientId} />
      <div className="flex-1 animate-slide-in">
        {children}
      </div>
    </div>
  );
};
