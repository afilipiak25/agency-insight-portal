
import { Layout } from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-6">Die angeforderte Seite konnte nicht gefunden werden.</p>
          <Button onClick={() => navigate('/')}>
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
