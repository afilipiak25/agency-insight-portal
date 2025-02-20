
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ClientStats } from '@/components/ClientStats';

const Index = () => {
  const [selectedClientId, setSelectedClientId] = useState(1);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar onClientSelect={setSelectedClientId} />
      <div className="flex-1 p-8 animate-slide-in">
        <ClientStats clientId={selectedClientId} />
      </div>
    </div>
  );
};

export default Index;
