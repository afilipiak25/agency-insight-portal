
import { Layout } from '@/components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600">Die angeforderte Seite konnte nicht gefunden werden.</p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
