import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import Pipeline from "./pages/Pipeline";
import Calendar from "./pages/Calendar";
import Inbox from "./pages/Inbox";
import LeadDatabase from "./pages/LeadDatabase";
import Integrations from "./pages/Integrations";
import IntegrationsCallback from "./pages/IntegrationsCallback";
import Personas from "./pages/Personas";
import TrainAI from "./pages/TrainAI";
import Mailboxes from "./pages/Mailboxes";
import AllClients from "./pages/AllClients";
import CreateClient from "./pages/CreateClient";
import NotFound from "./pages/NotFound";
import LeadOverview from "./pages/LeadOverview";

import "@/App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/campaigns/create" element={<CreateCampaign />} />
      <Route path="/pipeline" element={<Pipeline />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/leads" element={<LeadDatabase />} />
      <Route path="/integrations" element={<Integrations />} />
      <Route path="/integrations/callback" element={<IntegrationsCallback />} />
      <Route path="/train-ai" element={<TrainAI />} />
      <Route path="/personas" element={<Personas />} />
      <Route path="/mailboxes" element={<Mailboxes />} />
      <Route path="/clients" element={<AllClients />} />
      <Route path="/clients/create" element={<CreateClient />} />
      <Route path="/lead-overview" element={<LeadOverview />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
