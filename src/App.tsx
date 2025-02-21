
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/CreateCampaign';
import Integrations from './pages/Integrations';
import Pipeline from './pages/Pipeline';
import Calendar from './pages/Calendar';
import Inbox from './pages/Inbox';
import LeadDatabase from './pages/LeadDatabase';
import TrainAI from './pages/TrainAI';
import Personas from './pages/Personas';
import Mailboxes from './pages/Mailboxes';
import AllClients from './pages/AllClients';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/create" element={<CreateCampaign />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/leads" element={<LeadDatabase />} />
        <Route path="/train-ai" element={<TrainAI />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/mailboxes" element={<Mailboxes />} />
        <Route path="/clients" element={<AllClients />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
