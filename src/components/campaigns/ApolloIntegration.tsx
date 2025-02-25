
import { Button } from "@/components/ui/button";

export const ApolloIntegration = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Apollo.io Integration</h3>
        <p className="text-sm text-gray-600 mb-4">
          Connect your Apollo.io account to access your saved searches and leads.
        </p>
        <Button variant="outline" className="w-full">
          Connect Apollo.io
        </Button>
      </div>
    </div>
  );
};
