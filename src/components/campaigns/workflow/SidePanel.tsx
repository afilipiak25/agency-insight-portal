
import { Card } from "@/components/ui/card";
import { Bot, Library } from "lucide-react";

export const SidePanel = () => {
  return (
    <Card className="p-6">
      <div className="flex gap-4 items-start mb-6">
        <div className="p-3 bg-violet-50 rounded-xl">
          <Bot className="w-6 h-6 text-violet-600" />
        </div>
        <div>
          <h4 className="font-semibold text-lg">Create with AI</h4>
          <p className="text-gray-500">Let AI generate your multichannel campaigns</p>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="p-3 bg-blue-50 rounded-xl">
          <Library className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h4 className="font-semibold text-lg">Templates</h4>
          <p className="text-gray-500">Use a template to create your campaign</p>
        </div>
      </div>
    </Card>
  );
};
