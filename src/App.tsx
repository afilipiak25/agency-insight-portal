
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllClients from "./pages/AllClients";
import NotFound from "./pages/NotFound";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import Integrations from "./pages/Integrations";
import Pipeline from "./pages/Pipeline";
import Calendar from "./pages/Calendar";
import LeadDatabase from "./pages/LeadDatabase";
import Inbox from "./pages/Inbox";
import TrainAI from "./pages/TrainAI";
import Personas from "./pages/Personas";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clients" element={<AllClients />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/create" element={<CreateCampaign />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/leads" element={<LeadDatabase />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/train-ai" element={<TrainAI />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
