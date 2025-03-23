
import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
  MiniMap,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WorkflowStep } from '../types/workflow';
import { Mail, Linkedin, Eye, Instagram, Play, Users, ZoomIn, ZoomOut } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  score?: number;
  currentStep?: string;
  industry?: string;
  status?: 'active' | 'pending' | 'converted' | 'lost';
}

interface CampaignFlowVisualizationProps {
  workflowSteps: WorkflowStep[];
  leads?: any[];
}

export const CampaignFlowVisualization = ({ 
  workflowSteps,
  leads = []
}: CampaignFlowVisualizationProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showAllLeads, setShowAllLeads] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  // Function to get icon based on step channel
  const getStepIcon = (step: WorkflowStep) => {
    switch (step.channel) {
      case 'email':
        return <Mail className="w-5 h-5 text-pink-500" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5 text-blue-500" />;
      case 'profile-visit':
        return <Eye className="w-5 h-5 text-gray-500" />;
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-600" />;
      default:
        return <Mail className="w-5 h-5 text-purple-500" />;
    }
  };

  // Transform campaign steps into ReactFlow nodes and edges
  useEffect(() => {
    if (!workflowSteps.length) return;

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    
    // Start Node
    newNodes.push({
      id: 'start',
      type: 'default',
      position: { x: 250, y: 0 },
      data: { 
        label: (
          <div className="p-2 text-center">
            <div className="font-semibold text-green-600">Campaign Start</div>
          </div>
        )
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
      
      const deliveryRate = Math.floor(85 + Math.random() * 15);
      const openRate = Math.floor(30 + Math.random() * 50);
      
      newNodes.push({
        id: `step-${step.id}`,
        type: 'default',
        position: { x: 250, y: 120 + (index * 180) },
        data: { 
          label: (
            <div className="p-2 w-full">
              <div className="flex items-center gap-2 font-semibold">
                {getStepIcon(step)}
                <span>{step.title} {step.waitDays > 0 ? `(${step.waitDays} days)` : ''}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">{step.content}</div>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{deliveryRate}% Delivered</Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{openRate}% Opened</Badge>
              </div>
            </div>
          ),
          step,
          leads: stepLeads
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
              label: (
                <div className="p-2 text-sm w-full">
                  <div className="font-medium">{lead.firstName} {lead.lastName}</div>
                  <div className="text-gray-600">{lead.jobTitle}</div>
                  <div className="text-gray-500">{lead.companyName}</div>
                </div>
              )
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
              label: (
                <div className="p-2 text-sm w-full text-center">
                  <div className="text-gray-500">+{stepLeads.length - 3} more leads</div>
                </div>
              )
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
          label: (
            <div className="p-2 text-center">
              <div className="font-semibold text-red-600">Campaign End</div>
            </div>
          )
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

    setNodes(newNodes);
    setEdges(newEdges);
  }, [workflowSteps, leads, showAllLeads, isSimulating, activeNodeId]);

  const toggleShowAllLeads = () => {
    setShowAllLeads(!showAllLeads);
  };

  const simulateFlow = useCallback(() => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    setActiveNodeId('start');
    
    // Simulate the flow through steps with timing
    const simulateStep = (stepIndex: number) => {
      if (stepIndex <= workflowSteps.length) {
        const id = stepIndex === 0 ? 'start' : `step-${workflowSteps[stepIndex-1].id}`;
        setActiveNodeId(id);
        
        setTimeout(() => {
          simulateStep(stepIndex + 1);
        }, 1500);
      } else {
        // End with the end node
        setActiveNodeId('end');
        
        // Reset after showing the end node
        setTimeout(() => {
          setIsSimulating(false);
          setActiveNodeId(null);
        }, 1500);
      }
    };
    
    simulateStep(0);
  }, [isSimulating, workflowSteps]);

  return (
    <div className="h-[800px] w-full border border-gray-200 rounded-lg bg-gray-50 relative">
      <div className="h-12 absolute top-0 left-0 right-0 z-10 bg-white border-b px-4 flex items-center justify-between">
        <h3 className="font-semibold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          Campaign Flow Visualization
        </h3>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={toggleShowAllLeads}
            className="flex items-center gap-1"
          >
            <Users className="w-4 h-4" />
            {showAllLeads ? 'Hide' : 'Show All'} Leads
          </Button>
          <Button 
            size="sm" 
            variant={isSimulating ? "secondary" : "outline"}
            onClick={simulateFlow}
            disabled={isSimulating}
            className="flex items-center gap-1"
          >
            <Play className="w-4 h-4" />
            Simulate Flow
          </Button>
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        snapToGrid
        attributionPosition="bottom-right"
      >
        <Background size={1} gap={16} color="#f0f0f0" />
        <Controls showInteractive={false} />
        <MiniMap />
        <Panel position="bottom-right">
          <div className="flex gap-1 bg-white p-1 rounded border shadow-sm">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
