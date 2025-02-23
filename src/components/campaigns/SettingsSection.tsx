
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings2, MessageSquare, Zap, List, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SettingsSection = () => {
  const [emailsPerDay, setEmailsPerDay] = useState<number[]>([50]);
  const [minutesBetweenMessages, setMinutesBetweenMessages] = useState<number[]>([15]);
  const [autoImprovePrompts, setAutoImprovePrompts] = useState(true);
  const [autoCommunication, setAutoCommunication] = useState(true);
  const [selectedPipeline, setSelectedPipeline] = useState("default");
  const [stopAfterMeetings, setStopAfterMeetings] = useState("3");

  const emailsPerMonth = emailsPerDay[0] * 30;

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b">
          <Settings2 className="w-5 h-5 text-violet-500" />
          <h2 className="text-lg font-semibold">Kampagnen-Einstellungen</h2>
        </div>

        {/* E-Mails pro Tag Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">E-Mails pro Tag</label>
            <div className="text-sm text-gray-500">
              <span className="font-medium text-violet-600">{emailsPerDay[0]}</span> pro Tag / 
              <span className="font-medium text-violet-600 ml-1">{emailsPerMonth}</span> pro Monat
            </div>
          </div>
          <Slider
            value={emailsPerDay}
            onValueChange={setEmailsPerDay}
            max={200}
            step={1}
            className="[&_[role=slider]]:bg-violet-600"
          />
        </div>

        {/* Minuten zwischen Nachrichten Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium">Minuten zwischen Nachrichten</label>
            </div>
            <span className="text-sm font-medium text-violet-600">
              {minutesBetweenMessages[0]} Minuten
            </span>
          </div>
          <Slider
            value={minutesBetweenMessages}
            onValueChange={setMinutesBetweenMessages}
            min={1}
            max={60}
            step={1}
            className="[&_[role=slider]]:bg-violet-600"
          />
        </div>

        {/* Automatische Verbesserungen Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <label className="text-sm font-medium">Automatische Prompt-Verbesserungen</label>
            </div>
            <p className="text-sm text-gray-500">KI optimiert automatisch die Nachrichten basierend auf der Performance</p>
          </div>
          <Switch
            checked={autoImprovePrompts}
            onCheckedChange={setAutoImprovePrompts}
            className="data-[state=checked]:bg-violet-600"
          />
        </div>

        {/* Automatische Kommunikation Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <label className="text-sm font-medium">Automatische Kommunikation</label>
            </div>
            <p className="text-sm text-gray-500">Automatisches Senden von Nachrichten gemäß Workflow</p>
          </div>
          <Switch
            checked={autoCommunication}
            onCheckedChange={setAutoCommunication}
            className="data-[state=checked]:bg-violet-600"
          />
        </div>

        {/* Lead Pipeline Auswahl */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium">Lead Pipeline</label>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPipeline} onValueChange={setSelectedPipeline}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Pipeline auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Standard Pipeline</SelectItem>
                <SelectItem value="sales">Sales Pipeline</SelectItem>
                <SelectItem value="marketing">Marketing Pipeline</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="text-sm">
              Neue Pipeline erstellen
            </Button>
          </div>
        </div>

        {/* Stopp nach X Terminen */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium">Stopp nach X Terminen</label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={stopAfterMeetings}
              onChange={(e) => setStopAfterMeetings(e.target.value)}
              className="w-24"
              min="1"
              max="100"
            />
            <span className="text-sm text-gray-500">Termine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
