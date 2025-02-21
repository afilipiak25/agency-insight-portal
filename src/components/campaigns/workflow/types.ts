
import { ReactNode } from "react";

export type WorkflowStep = {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: ReactNode;
};
