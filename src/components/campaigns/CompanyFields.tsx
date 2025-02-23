
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, ShoppingCart, Upload, Store, Info, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const CompanyFields = () => {
  return (
    <>
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
        <Select>
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

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Company Search
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Search for specific companies you want to target</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Search for specific companies..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="microsoft">Microsoft Corporation</SelectItem>
            <SelectItem value="apple">Apple Inc.</SelectItem>
            <SelectItem value="amazon">Amazon.com Inc.</SelectItem>
            <SelectItem value="google">Google (Alphabet Inc.)</SelectItem>
            <SelectItem value="meta">Meta Platforms Inc.</SelectItem>
            <SelectItem value="nvidia">NVIDIA Corporation</SelectItem>
            <SelectItem value="tesla">Tesla, Inc.</SelectItem>
            <SelectItem value="salesforce">Salesforce.com Inc.</SelectItem>
            <SelectItem value="oracle">Oracle Corporation</SelectItem>
            <SelectItem value="ibm">IBM Corporation</SelectItem>
            <SelectItem value="sap">SAP SE</SelectItem>
            <SelectItem value="adobe">Adobe Inc.</SelectItem>
            <SelectItem value="intel">Intel Corporation</SelectItem>
            <SelectItem value="cisco">Cisco Systems Inc.</SelectItem>
            <SelectItem value="siemens">Siemens AG</SelectItem>
            <SelectItem value="samsung">Samsung Electronics</SelectItem>
            <SelectItem value="sony">Sony Group Corporation</SelectItem>
            <SelectItem value="dell">Dell Technologies Inc.</SelectItem>
            <SelectItem value="hp">HP Inc.</SelectItem>
            <SelectItem value="vmware">VMware Inc.</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
