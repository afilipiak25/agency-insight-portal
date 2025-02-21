
interface LeadPreviewProps {
  showEmailPreview?: boolean;
}

export const LeadPreview = ({ showEmailPreview = false }: LeadPreviewProps) => {
  if (showEmailPreview) {
    return <PreviewSection />;
  }

  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <div className="space-y-1">
        <h2 className="font-semibold text-lg">Preview Leads</h2>
        <p className="text-sm text-violet-600 font-medium">54,632 leads total</p>
      </div>
      
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Marc Nagel</span>
            <span className="text-xs text-gray-500">CEO</span>
          </div>
          <div className="text-xs text-gray-500">Acme GmbH • Berlin, Germany</div>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Sarah Weber</span>
            <span className="text-xs text-gray-500">Marketing Director</span>
          </div>
          <div className="text-xs text-gray-500">TechCorp • Munich, Germany</div>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Thomas Müller</span>
            <span className="text-xs text-gray-500">Head of Sales</span>
          </div>
          <div className="text-xs text-gray-500">Digital Solutions • Hamburg, Germany</div>
        </div>
      </div>
    </div>
  );
};
