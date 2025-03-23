
import { Node, Edge, MarkerType } from '@xyflow/react';
import { WorkflowStep } from '../../types/workflow';
import { ReactElement } from 'react';

interface CreateNodesAndEdgesOptions {
  workflowSteps: WorkflowStep[];
  leads: any[];
  showAllLeads: boolean;
  isSimulating: boolean;
  activeNodeId: string | null;
}

export const createNodesAndEdges = ({
  workflowSteps,
  leads,
  showAllLeads,
  isSimulating,
  activeNodeId
}: CreateNodesAndEdgesOptions): { nodes: Node[], edges: Edge[] } => {
  const newNodes: Node[] = [];
  const newEdges: Edge[] = [];
  
  // Start Node
  newNodes.push({
    id: 'start',
    type: 'default',
    position: { x: 250, y: 0 },
    data: { 
      label: 'Campaign Start',
      type: 'start'
    },
    style: {
      background: '#f0fff4',
      border: '1px solid #38a169',
      borderRadius: '8px',
      padding: '10px',
      width: 200,
    }
  });

  // Step Nodes
  workflowSteps.forEach((step, index) => {
    // Calculate how many leads are in this step
    const stepLeads = leads.filter(lead => 
      Math.floor(Math.random() * workflowSteps.length) === index
    );
    
    newNodes.push({
      id: `step-${step.id}`,
      type: 'default',
      position: { x: 250, y: 120 + (index * 180) },
      data: { 
        label: `${step.title} ${step.waitDays > 0 ? `(${step.waitDays} days)` : ''}`,
        icon: step.icon,
        content: step.content,
        step,
        leads: stepLeads,
        stats: {
          delivered: Math.floor(85 + Math.random() * 15),
          opened: Math.floor(30 + Math.random() * 50)
        }
      },
      style: {
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '10px',
        width: 250,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        zIndex: 10
      }
    });

    // Create lead nodes to the right of each step
    if (stepLeads.length > 0) {
      const leadsToShow = showAllLeads ? stepLeads : stepLeads.slice(0, 3);
      
      leadsToShow.forEach((lead, leadIndex) => {
        newNodes.push({
          id: `lead-${step.id}-${leadIndex}`,
          type: 'default',
          position: { x: 550, y: 100 + (index * 180) + (leadIndex * 60) },
          data: { 
            label: `${lead.firstName} ${lead.lastName}`,
            jobTitle: lead.jobTitle,
            companyName: lead.companyName,
            lead
          },
          style: {
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '5px',
            width: 200,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            opacity: isSimulating && activeNodeId !== `step-${step.id}` ? 0.4 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }
        });

        // Connect step to lead
        newEdges.push({
          id: `step-${step.id}-to-lead-${leadIndex}`,
          source: `step-${step.id}`,
          target: `lead-${step.id}-${leadIndex}`,
          type: 'smoothstep',
          animated: isSimulating && activeNodeId === `step-${step.id}`,
          style: { 
            stroke: '#cbd5e0', 
            strokeWidth: 1, 
            opacity: 0.6 
          }
        });
      });

      // "More leads" node if there are more leads than shown
      if (!showAllLeads && stepLeads.length > 3) {
        newNodes.push({
          id: `more-leads-${step.id}`,
          type: 'default',
          position: { x: 550, y: 100 + (index * 180) + (3 * 60) },
          data: { 
            label: `+${stepLeads.length - 3} more leads`,
            type: 'more-leads'
          },
          style: {
            background: '#f7fafc',
            border: '1px dashed #cbd5e0',
            borderRadius: '8px',
            padding: '5px',
            width: 200,
          }
        });
      }
    }

    // Connect steps with edges
    if (index === 0) {
      // Connect start to first step
      newEdges.push({
        id: `start-to-step-${step.id}`,
        source: 'start',
        target: `step-${step.id}`,
        type: 'smoothstep',
        animated: isSimulating && activeNodeId === 'start',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 15,
          height: 15,
          color: '#718096',
        },
        style: { stroke: '#718096' }
      });
    } else {
      // Connect previous step to current step
      newEdges.push({
        id: `step-${workflowSteps[index-1].id}-to-step-${step.id}`,
        source: `step-${workflowSteps[index-1].id}`,
        target: `step-${step.id}`,
        type: 'smoothstep',
        animated: isSimulating && activeNodeId === `step-${workflowSteps[index-1].id}`,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 15,
          height: 15,
          color: '#718096',
        },
        style: { stroke: '#718096' }
      });
    }
  });

  // End Node
  const lastStepIndex = workflowSteps.length - 1;
  if (lastStepIndex >= 0) {
    newNodes.push({
      id: 'end',
      type: 'default',
      position: { x: 250, y: 120 + ((lastStepIndex + 1) * 180) },
      data: { 
        label: 'Campaign End',
        type: 'end'
      },
      style: {
        background: '#fff5f5',
        border: '1px solid #e53e3e',
        borderRadius: '8px',
        padding: '10px',
        width: 200,
      }
    });

    // Connect last step to end
    newEdges.push({
      id: `step-${workflowSteps[lastStepIndex].id}-to-end`,
      source: `step-${workflowSteps[lastStepIndex].id}`,
      target: 'end',
      type: 'smoothstep',
      animated: isSimulating && activeNodeId === `step-${workflowSteps[lastStepIndex].id}`,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
        color: '#718096',
      },
      style: { stroke: '#718096' }
    });
  }

  return { nodes: newNodes, edges: newEdges };
};
