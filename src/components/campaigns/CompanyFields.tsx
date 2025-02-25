
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, ShoppingCart, Upload, Store, Info, Users, Globe } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CompanyFieldsProps {
  onDataSourceChange?: (source: string) => void;
}

export const CompanyFields = ({ onDataSourceChange }: CompanyFieldsProps) => {
  const handleDataSourceChange = (value: string) => {
    if (onDataSourceChange) {
      onDataSourceChange(value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Select Data Type:
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Choose the type of data source for your campaign</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Select onValueChange={handleDataSourceChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select database" />
          </SelectTrigger>
          <SelectContent className="w-[calc(100vw-32rem)] max-w-2xl">
            <SelectItem value="b2b" className="py-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-50 rounded-lg flex-shrink-0">
                  <Building2 className="w-5 h-5 text-violet-600" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">B2B</div>
                  <div className="text-sm text-gray-500 break-words">
                    Search from a database of over 100M verified contacts with an extraordinary amount of enriched data.
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="website" className="py-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-50 rounded-lg flex-shrink-0">
                  <Globe className="w-5 h-5 text-violet-600" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">Website Retargeting</div>
                  <div className="text-sm text-gray-500 break-words">
                    Target visitors who have shown interest in your website and convert them into qualified leads.
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="lookalike" className="py-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-50 rounded-lg flex-shrink-0">
                  <Users className="w-5 h-5 text-violet-600" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">Lookalike LinkedIn Audience</div>
                  <div className="text-sm text-gray-500 break-words">
                    Find similar companies based on your successful LinkedIn connections and engagements.
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="ecommerce" className="py-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-50 rounded-lg flex-shrink-0">
                  <ShoppingCart className="w-5 h-5 text-violet-600" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">E-Commerce</div>
                  <div className="text-sm text-gray-500 break-words">
                    Search leads from 12M stores across 300 platforms including Shopify and WooCommerce.
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="csv" className="py-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-50 rounded-lg flex-shrink-0">
                  <Upload className="w-5 h-5 text-violet-600" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">CSV</div>
                  <div className="text-sm text-gray-500 break-words">
                    Import your leads and enrich them with our data miner.
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="local" className="py-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-50 rounded-lg flex-shrink-0">
                  <Store className="w-5 h-5 text-violet-600" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">Local Data</div>
                  <div className="text-sm text-gray-500 break-words">
                    Access a database of over 200M local Google Maps businesses and decision makers worldwide.
                  </div>
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
