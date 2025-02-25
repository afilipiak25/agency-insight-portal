import { Input } from "@/components/ui/input";
import { ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const AdvancedTargeting = () => {
  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Advanced Targeting</h3>
        <ChevronUp className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="space-y-6">
        {/* Company Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Company Name
          </Label>
          <Input 
            placeholder="Enter company names, separated by commas"
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Add multiple company names or partial matches
          </p>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Industry
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="software">Software & Technology</SelectItem>
              <SelectItem value="financial">Financial Services</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail & E-commerce</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="professional">Professional Services</SelectItem>
              <SelectItem value="real_estate">Real Estate</SelectItem>
              <SelectItem value="telecom">Telecommunications</SelectItem>
              <SelectItem value="media">Media & Entertainment</SelectItem>
              <SelectItem value="hospitality">Hospitality & Tourism</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
              <SelectItem value="energy">Energy & Utilities</SelectItem>
              <SelectItem value="logistics">Transportation & Logistics</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sub-Industry */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Sub-Industry
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select sub-industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="ai_ml">AI & Machine Learning</SelectItem>
              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="cloud">Cloud Services</SelectItem>
              <SelectItem value="fintech">FinTech</SelectItem>
              <SelectItem value="biotech">Biotech</SelectItem>
              <SelectItem value="ecommerce">E-commerce Platforms</SelectItem>
              <SelectItem value="digital_marketing">Digital Marketing</SelectItem>
              <SelectItem value="consulting">Management Consulting</SelectItem>
              <SelectItem value="investment">Investment Banking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Business Model */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Business Model
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select business model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b2b">B2B</SelectItem>
              <SelectItem value="b2c">B2C</SelectItem>
              <SelectItem value="b2b2c">B2B2C</SelectItem>
              <SelectItem value="d2c">D2C</SelectItem>
              <SelectItem value="marketplace">Marketplace</SelectItem>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="smb">SMB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Company Keywords */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Company Keywords
          </Label>
          <Input 
            placeholder="e.g., startup, enterprise, innovation"
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Add keywords that describe the companies you want to target
          </p>
        </div>

        {/* Company Description Keywords */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Company Description Keywords
          </Label>
          <Input 
            placeholder="e.g., artificial intelligence, cloud computing"
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Search for specific terms in company descriptions
          </p>
        </div>

        {/* Company Size */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Company Size
          </Label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Min</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Min. Employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Max</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Max. Employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1,000</SelectItem>
                  <SelectItem value="5000">5,000</SelectItem>
                  <SelectItem value="10000">10,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Company Revenue */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Annual Revenue
          </Label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Min</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Min. Revenue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">$1M</SelectItem>
                  <SelectItem value="5m">$5M</SelectItem>
                  <SelectItem value="10m">$10M</SelectItem>
                  <SelectItem value="50m">$50M</SelectItem>
                  <SelectItem value="100m">$100M</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Max</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Max. Revenue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5m">$5M</SelectItem>
                  <SelectItem value="10m">$10M</SelectItem>
                  <SelectItem value="50m">$50M</SelectItem>
                  <SelectItem value="100m">$100M</SelectItem>
                  <SelectItem value="1b">$1B+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Technologies
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select technology" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salesforce">Salesforce</SelectItem>
              <SelectItem value="hubspot">HubSpot</SelectItem>
              <SelectItem value="marketo">Marketo</SelectItem>
              <SelectItem value="zendesk">Zendesk</SelectItem>
              <SelectItem value="intercom">Intercom</SelectItem>
              <SelectItem value="slack">Slack</SelectItem>
              <SelectItem value="microsoft_teams">Microsoft Teams</SelectItem>
              <SelectItem value="zoom">Zoom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Funding */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Funding Status
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select funding status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seed">Seed</SelectItem>
              <SelectItem value="series_a">Series A</SelectItem>
              <SelectItem value="series_b">Series B</SelectItem>
              <SelectItem value="series_c">Series C</SelectItem>
              <SelectItem value="series_d_plus">Series D+</SelectItem>
              <SelectItem value="ipo">IPO</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Intent Signals */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Intent Signals
          </Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600" htmlFor="hiring">
                Actively Hiring
              </Label>
              <Switch id="hiring" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600" htmlFor="growth">
                High Company Growth
              </Label>
              <Switch id="growth" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600" htmlFor="funding">
                Recently Funded
              </Label>
              <Switch id="funding" />
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Keywords
          </Label>
          <Input 
            placeholder="e.g., AI, Machine Learning, Digital Transformation"
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Separate multiple keywords with commas
          </p>
        </div>

        {/* Contact Level */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Contact Level
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select contact level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="c_level">C-Level</SelectItem>
              <SelectItem value="vp_level">VP Level</SelectItem>
              <SelectItem value="director_level">Director Level</SelectItem>
              <SelectItem value="manager_level">Manager Level</SelectItem>
              <SelectItem value="senior_individual">Senior Individual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Company Age */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Company Age
          </Label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Min Years</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Min age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Max Years</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Max age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Growth Rate */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Growth Rate (YoY)
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select growth rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="negative">Negative</SelectItem>
              <SelectItem value="0_10">0-10%</SelectItem>
              <SelectItem value="10_25">10-25%</SelectItem>
              <SelectItem value="25_50">25-50%</SelectItem>
              <SelectItem value="50_100">50-100%</SelectItem>
              <SelectItem value="100_plus">100%+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hiring Plans */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Hiring Plans
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select hiring status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="actively_hiring">Actively Hiring</SelectItem>
              <SelectItem value="planning_to_hire">Planning to Hire</SelectItem>
              <SelectItem value="not_hiring">Not Hiring</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Departments */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Departments Using Apollo
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
