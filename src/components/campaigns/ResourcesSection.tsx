
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileUp, Image, Link, Upload } from "lucide-react";
import { useState } from "react";

interface CalendlyMeeting {
  id: string;
  name: string;
  duration: string;
}

const mockMeetings: CalendlyMeeting[] = [
  { id: "1", name: "Erstgespräch", duration: "30min" },
  { id: "2", name: "Produktdemo", duration: "45min" },
  { id: "3", name: "Strategieberatung", duration: "60min" },
];

export const ResourcesSection = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'image') => {
    const files = event.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter(file => {
      if (type === 'pdf') {
        return file.type === 'application/pdf';
      } else {
        return file.type.startsWith('image/');
      }
    });

    if (type === 'pdf') {
      setSelectedFiles(prev => [...prev, ...validFiles]);
    } else {
      setSelectedImages(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number, type: 'pdf' | 'image') => {
    if (type === 'pdf') {
      setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      setSelectedImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-6">Ressourcen</h2>
      
      <Tabs defaultValue="pdfs" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-gray-100 p-1">
          <TabsTrigger value="pdfs" className="gap-2 data-[state=active]:bg-white">
            <FileUp className="w-4 h-4" />
            PDFs
          </TabsTrigger>
          <TabsTrigger value="calendly" className="gap-2 data-[state=active]:bg-white">
            <Calendar className="w-4 h-4" />
            Calendly
          </TabsTrigger>
          <TabsTrigger value="images" className="gap-2 data-[state=active]:bg-white">
            <Image className="w-4 h-4" />
            Bilder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pdfs" className="mt-0">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-4 text-center">
                PDF-Dateien hier ablegen oder
                <label className="text-violet-600 hover:text-violet-700 cursor-pointer mx-1">
                  durchsuchen
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'pdf')}
                  />
                </label>
              </p>
              <p className="text-xs text-gray-500">Maximale Dateigröße: 10MB</p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileUp className="w-5 h-5 text-violet-600" />
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index, 'pdf')}
                      className="text-red-500 hover:text-red-700"
                    >
                      Entfernen
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendly" className="mt-0">
          <div className="space-y-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Calendly Link</label>
                <Input placeholder="https://calendly.com/your-link" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Meeting Typ</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Meeting Typ auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMeetings.map((meeting) => (
                      <SelectItem key={meeting.id} value={meeting.id}>
                        {meeting.name} ({meeting.duration})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="images" className="mt-0">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-4 text-center">
                Bilder hier ablegen oder
                <label className="text-violet-600 hover:text-violet-700 cursor-pointer mx-1">
                  durchsuchen
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image')}
                  />
                </label>
              </p>
              <p className="text-xs text-gray-500">Maximale Dateigröße: 5MB pro Bild</p>
            </div>

            {selectedImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index, 'image')}
                        className="text-white hover:text-red-200"
                      >
                        Entfernen
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
