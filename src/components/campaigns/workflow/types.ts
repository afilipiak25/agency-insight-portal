
import { ReactNode } from "react";

export interface WorkflowStep {
  id: string;
  type: "automatic" | "manual" | "other";
  title: string;
  description: string;
  icon: ReactNode | null;
}

export interface WorkflowCondition {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  type?: string;
}
