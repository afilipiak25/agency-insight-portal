
import { Badge } from '@/components/ui/badge';
import { Clock, Mail, CheckCircle, XCircle } from 'lucide-react';
import { Lead } from '../types/leads';

export const getStatusBadge = (status: Lead['status']) => {
  switch (status) {
    case 'not-started':
      return <Badge variant="outline" className="bg-gray-100 text-gray-600">Not Started</Badge>;
    case 'in-progress':
      return <Badge variant="outline" className="bg-blue-100 text-blue-700">In Progress</Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-green-100 text-green-700">Completed</Badge>;
    case 'failed':
      return <Badge variant="outline" className="bg-red-100 text-red-700">Failed</Badge>;
    default:
      return null;
  }
};

export const getStatusIcon = (status: Lead['status']) => {
  switch (status) {
    case 'not-started':
      return <Clock className="w-4 h-4 text-gray-500" />;
    case 'in-progress':
      return <Mail className="w-4 h-4 text-blue-500" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'failed':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
};
