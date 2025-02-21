
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, ShoppingCart, Upload, Store } from "lucide-react";

export const CompanyFields = () => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Select Data Type:
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select database" />
          </SelectTrigger>
          <SelectContent className="w-[400px]">
            <SelectItem value="b2b" className="py-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <div className="font-medium">B2B</div>
                  <div className="text-sm text-gray-500">
                    Search from a database of over 100M verified contacts with an extraordinary amount of enriched data.
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="ecommerce" className="py-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-50 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <div className="font-medium">E-Commerce</div>
                  <div className="text-sm text-gray-500">
                    Search leads from 12M stores across 300 platforms including Shopify and WooCommerce.
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="csv" className="py-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-50 rounded-lg">
                  <Upload className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <div className="font-medium">CSV</div>
                  <div className="text-sm text-gray-500">
                    Import your leads and enrich them with our data miner.
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="local" className="py-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-violet-50 rounded-lg">
                  <Store className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <div className="font-medium">Local Data</div>
                  <div className="text-sm text-gray-500">
                    Access a database of over 200M local Google Maps businesses and decision makers worldwide.
                  </div>
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Company Search
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Search for specific companies..." />
          </SelectTrigger>
          <SelectContent>
            {[...Array(50)].map((_, i) => (
              <SelectItem key={i} value={`company-${i + 1}`}>
                Company {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
