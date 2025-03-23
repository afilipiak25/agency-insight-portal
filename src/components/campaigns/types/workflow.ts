
import { ReactElement } from "react";

export interface WorkflowStep {
  id: number;
  sequenceNum: number;
  type: string;
  icon: ReactElement;
  title: string;
  content: string;
  waitDays: number;
  status?: 'completed' | 'in-progress' | 'not-met' | 'missing-inputs';
  personalized?: boolean;
  color?: string;
}
