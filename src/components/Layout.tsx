
import { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [selectedClientId, setSelectedClientId] = useState(1);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar onClientSelect={setSelectedClientId} />
        <main className="flex-1 w-full overflow-x-hidden bg-gradient-to-br from-gray-50 to-white">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
