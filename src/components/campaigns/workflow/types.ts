
export interface WorkflowStep {
  id: string;
  type: "automatic" | "manual" | "other";
  title: string;
  description: string;
  icon: React.ReactNode | null;
}

export interface WorkflowCondition {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}
