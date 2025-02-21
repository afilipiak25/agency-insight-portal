
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ClientStats } from '@/components/ClientStats';

const Index = () => {
  const [selectedClientId, setSelectedClientId] = useState(1);

  return (
    <Layout>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="p-4 sm:p-6 md:p-8 w-full">
          <ClientStats clientId={selectedClientId} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
