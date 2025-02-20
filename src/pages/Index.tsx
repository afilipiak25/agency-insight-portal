
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ClientStats } from '@/components/ClientStats';

const Index = () => {
  const [selectedClientId, setSelectedClientId] = useState(1);

  return (
    <Layout>
      <div className="p-8">
        <ClientStats clientId={selectedClientId} />
      </div>
    </Layout>
  );
};

export default Index;
