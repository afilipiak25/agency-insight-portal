
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import AllClients from "./pages/AllClients";
import Calendar from "./pages/Calendar";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import Inbox from "./pages/Inbox";
import Integrations from "./pages/Integrations";
import LeadDatabase from "./pages/LeadDatabase";
import NotFound from "./pages/NotFound";
import Personas from "./pages/Personas";
import Pipeline from "./pages/Pipeline";
import TrainAI from "./pages/TrainAI";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clients" element={<AllClients />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/campaigns/create" element={<CreateCampaign />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/integrations" element={<Integrations />} />
      <Route path="/leads" element={<LeadDatabase />} />
      <Route path="/personas" element={<Personas />} />
      <Route path="/pipeline" element={<Pipeline />} />
      <Route path="/train-ai" element={<TrainAI />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
