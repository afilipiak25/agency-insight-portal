
import React from "react";
import { ApolloLead } from "../types/apollo-filters";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface EmailFinderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: ApolloLead | null;
}

export const EmailFinderDialog: React.FC<EmailFinderDialogProps> = ({
  open,
  onOpenChange,
  lead,
}) => {
  if (!lead) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>Find Email for {lead.name}</DialogTitle>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-2 border-purple-500 rounded-full border-t-transparent"></div>
          </div>
          <p className="text-center text-sm text-gray-500">Searching for email addresses...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
