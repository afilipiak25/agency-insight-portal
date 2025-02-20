
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, Mail, Calendar, Linkedin } from 'lucide-react';
import { ClientOverview } from '@/types/client';

interface ConnectionErrorDialogProps {
  client: ClientOverview | null;
  onClose: () => void;
}

export const ConnectionErrorDialog = ({ client, onClose }: ConnectionErrorDialogProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConnectionIcon = (type: 'email' | 'linkedin' | 'calendar') => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5 text-red-500" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5 text-red-500" />;
      case 'calendar':
        return <Calendar className="w-5 h-5 text-red-500" />;
    }
  };

  const getConnectionLabel = (type: 'email' | 'linkedin' | 'calendar') => {
    switch (type) {
      case 'email':
        return 'E-Mail Anbindung';
      case 'linkedin':
        return 'LinkedIn Integration';
      case 'calendar':
        return 'Kalender Synchronisation';
    }
  };

  return (
    <Dialog open={!!client} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Connection Fehler
          </DialogTitle>
        </DialogHeader>
        
        {client?.connectionError && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-50 rounded-lg">
                {getConnectionIcon(client.connectionError.type)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {getConnectionLabel(client.connectionError.type)}
                </h3>
                <p className="text-sm text-red-600">
                  Fehler seit: {formatDate(client.connectionError.since)}
                </p>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 text-red-500" />
                <div className="space-y-2">
                  <p className="text-gray-700">
                    {client.connectionError.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
