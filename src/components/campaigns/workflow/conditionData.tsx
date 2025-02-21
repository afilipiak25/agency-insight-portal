
import { Mail, Link, Phone, Settings, MailOpen, MousePointer, UserMinus, CalendarCheck, UserPlus } from "lucide-react";
import type { WorkflowCondition } from "./types";

export const leadInformationConditions: WorkflowCondition[] = [
  {
    id: "has-email",
    title: "Has email address",
    description: "",
    icon: <Mail className="w-5 h-5 text-blue-500" />
  },
  {
    id: "has-linkedin",
    title: "Has LinkedIn URL",
    description: "LinkedIn",
    icon: <Link className="w-5 h-5 text-blue-500" />
  },
  {
    id: "has-phone",
    title: "Has phone number",
    description: "",
    icon: <Phone className="w-5 h-5 text-blue-500" />
  },
  {
    id: "custom",
    title: "Custom condition",
    description: "",
    icon: <Settings className="w-5 h-5 text-blue-500" />
  }
];

export const leadActionsConditions: WorkflowCondition[] = [
  {
    id: "opened-email",
    title: "Opened email",
    description: "",
    icon: <MailOpen className="w-5 h-5 text-blue-500" />
  },
  {
    id: "clicked-link",
    title: "Clicked on link in email",
    description: "",
    icon: <MousePointer className="w-5 h-5 text-blue-500" />
  },
  {
    id: "unsubscribe",
    title: "Unsubscribe from email",
    description: "",
    icon: <UserMinus className="w-5 h-5 text-blue-500" />
  },
  {
    id: "booked-meeting",
    title: "Booked a meeting",
    description: "lemcal",
    icon: <CalendarCheck className="w-5 h-5 text-blue-500" />
  },
  {
    id: "accepted-invite",
    title: "Accepted invite",
    description: "LinkedIn",
    icon: <UserPlus className="w-5 h-5 text-blue-500" />
  }
];
