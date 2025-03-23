
import { Layout } from "@/components/Layout";
import { LeadTable } from "@/components/leads/LeadTable";

const LeadOverview = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-amplifa-blue">Lead Overview</h1>
        </div>
        
        <LeadTable />
      </div>
    </Layout>
  );
};

export default LeadOverview;
