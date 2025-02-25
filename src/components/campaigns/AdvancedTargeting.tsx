
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
        {/* Unternehmensgröße */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Unternehmensgröße
          </Label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="text-xs text-gray-600">Min</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Min. Mitarbeiter" />
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
                  <SelectValue placeholder="Max. Mitarbeiter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1.000</SelectItem>
                  <SelectItem value="5000">5.000</SelectItem>
                  <SelectItem value="10000">10.000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Technologien
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Technologie auswählen" />
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
              <SelectValue placeholder="Funding Status auswählen" />
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
                Aktiv auf der Suche nach Mitarbeitern
              </Label>
              <Switch id="hiring" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600" htmlFor="growth">
                Starkes Unternehmenswachstum
              </Label>
              <Switch id="growth" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600" htmlFor="funding">
                Kürzlich Funding erhalten
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
            placeholder="z.B. AI, Machine Learning, Digital Transformation"
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Trennen Sie mehrere Keywords durch Kommas
          </p>
        </div>

        {/* Contact Level */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Kontaktebene
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Kontaktebene auswählen" />
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
      </div>
    </div>
  );
};
