
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Plus, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const timeSlots = Array.from({ length: 14 }, (_, i) => {
  const hour = i + 7; // Start from 7:00
  return `${hour.toString().padStart(2, '0')}:00`;
});

const weekDays = [
  { day: "Sonntag", date: "16.02." },
  { day: "Montag", date: "17.02." },
  { day: "Dienstag", date: "18.02." },
  { day: "Mittwoch", date: "19.02." },
  { day: "Donnerstag", date: "20.02." },
  { day: "Freitag", date: "21.02." },
  { day: "Samstag", date: "22.02." },
];

interface Meeting {
  title: string;
  person: string;
  startTime: string;
  endTime: string;
  day: string;
}

const meetings: Meeting[] = [
  {
    title: "Produktvorstellung",
    person: "Michael Schmidt",
    startTime: "10:00",
    endTime: "10:30",
    day: "16.02.",
  },
  // Wiederholen für jeden Tag
  {
    title: "Produktvorstellung",
    person: "Michael Schmidt",
    startTime: "10:00",
    endTime: "10:30",
    day: "17.02.",
  },
  {
    title: "Produktvorstellung",
    person: "Michael Schmidt",
    startTime: "10:00",
    endTime: "10:30",
    day: "18.02.",
  },
  {
    title: "Produktvorstellung",
    person: "Michael Schmidt",
    startTime: "10:00",
    endTime: "10:30",
    day: "19.02.",
  },
  {
    title: "Produktvorstellung",
    person: "Michael Schmidt",
    startTime: "10:00",
    endTime: "10:30",
    day: "20.02.",
  },
  {
    title: "Produktvorstellung",
    person: "Michael Schmidt",
    startTime: "10:00",
    endTime: "10:30",
    day: "21.02.",
  },
  {
    title: "Produktvorstellung",
    person: "Michael Schmidt",
    startTime: "10:00",
    endTime: "10:30",
    day: "22.02.",
  },
];

const CalendarPage = () => {
  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-semibold">Kalender</h1>
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Alle Termine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Termine</SelectItem>
                <SelectItem value="my">Meine Termine</SelectItem>
                <SelectItem value="team">Team Termine</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="default" className="gap-2">
            <Plus className="w-4 h-4" />
            Neuer Termin
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-amplifa-blue/5 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <CalendarIcon className="w-5 h-5 text-amplifa-blue" />
              <h2 className="font-medium">Heute</h2>
            </div>
            <div className="text-3xl font-semibold mb-1">4 Termine</div>
          </div>

          <div className="bg-amplifa-purple/5 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-amplifa-purple" />
              <h2 className="font-medium">Diese Woche</h2>
            </div>
            <div className="text-3xl font-semibold mb-1">12 Termine</div>
          </div>

          <div className="bg-amplifa-pink/5 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-amplifa-pink" />
              <h2 className="font-medium">Team-Mitglieder</h2>
            </div>
            <div className="text-3xl font-semibold mb-1">3</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-8 border-b">
            <div className="p-4 font-medium text-gray-500 border-r">Zeit</div>
            {weekDays.map(({ day, date }) => (
              <div key={date} className="p-4 text-center">
                <div className="font-medium">{day}</div>
                <div className="text-sm text-gray-500">{date}</div>
              </div>
            ))}
          </div>

          <div className="divide-y">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-8">
                <div className="p-4 text-sm text-gray-500 border-r">{time}</div>
                {weekDays.map(({ date }) => (
                  <div key={date} className="p-2 border-r min-h-[100px] relative">
                    {meetings.find(
                      (meeting) =>
                        meeting.day === date && meeting.startTime === time
                    ) && (
                      <div className="absolute inset-x-2 bg-blue-100 rounded p-2 text-sm">
                        <div className="font-medium text-blue-700">
                          Produktvorstellung
                        </div>
                        <div className="text-blue-600 text-xs">
                          Michael Schmidt
                        </div>
                        <div className="text-blue-500 text-xs">
                          10:00 - 10:30
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
