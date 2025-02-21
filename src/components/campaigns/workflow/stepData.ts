
import { Mail, MessageSquare, Mic, UserPlus, Eye, Phone, ListTodo, Database, Share2 } from "lucide-react";
import { WorkflowStep } from "./types";

export const automaticSteps: WorkflowStep[] = [
  {
    id: "email",
    type: "automatic",
    title: "Email",
    description: "Send automatic email",
    icon: <Mail className="w-5 h-5 text-green-500" />,
  },
  {
    id: "chat",
    type: "automatic",
    title: "Chat message",
    description: "Send on LinkedIn",
    icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "voice",
    type: "automatic",
    title: "Voice message",
    description: "Send on LinkedIn",
    icon: <Mic className="w-5 h-5 text-indigo-500" />,
  },
  {
    id: "invitation",
    type: "automatic",
    title: "Invitation",
    description: "Send on LinkedIn",
    icon: <UserPlus className="w-5 h-5 text-violet-500" />,
  },
  {
    id: "visit",
    type: "automatic",
    title: "Visit profile",
    description: "Visit profile",
    icon: <Eye className="w-5 h-5 text-sky-500" />,
  },
];

export const manualSteps: WorkflowStep[] = [
  {
    id: "call",
    type: "manual",
    title: "Call",
    description: "Create a task",
    icon: <Phone className="w-5 h-5 text-rose-500" />,
  },
  {
    id: "task",
    type: "manual",
    title: "Manual task",
    description: "Create a task",
    icon: <ListTodo className="w-5 h-5 text-orange-500" />,
  },
];

export const otherSteps: WorkflowStep[] = [
  {
    id: "api",
    type: "other",
    title: "Call an API",
    description: "Call an API",
    icon: <Database className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "campaign",
    type: "other",
    title: "Send to another campaign",
    description: "Transfer to campaign",
    icon: <Share2 className="w-5 h-5 text-purple-500" />,
  },
];
