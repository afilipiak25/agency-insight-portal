
import { Mail, MessageSquare, Eye, Instagram } from "lucide-react";
import { ReactNode } from "react";

export interface ChannelOption {
  value: string;
  label: string;
  icon: ReactNode;
}

export const channelOptions: ChannelOption[] = [
  { value: 'email', label: 'Email', icon: <Mail className="w-4 h-4 text-blue-600" /> },
  { value: 'linkedin', label: 'LinkedIn', icon: <MessageSquare className="w-4 h-4 text-blue-600" /> },
  { value: 'profile-visit', label: 'Profile Visit', icon: <Eye className="w-4 h-4 text-blue-600" /> },
  { value: 'instagram', label: 'Instagram', icon: <Instagram className="w-4 h-4 text-blue-600" /> },
];

export const DEFAULT_PROMPT_TEMPLATES: Record<string, string> = {
  'email': 'Hey #FirstName#,\n\nI noticed you work at #CompanyName# and...',
  'linkedin': 'Hi #FirstName#,\n\nI came across your profile and...',
  'profile-visit': 'Template for profile visit engagement...',
  'instagram': 'Hi #FirstName#, just saw your Instagram profile...',
};
