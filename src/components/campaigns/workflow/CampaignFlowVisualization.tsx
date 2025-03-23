
import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  MiniMap,
  Panel,
  NodeMouseHandler
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkflowStep } from '../types/workflow';
import { FlowControls } from './components/FlowControls';
import { StepPreviewSheet } from './components/StepPreviewSheet';
import { createNodesAndEdges } from './utils/nodeUtils';

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
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState('content');

  // Transform campaign steps into ReactFlow nodes and edges
  useEffect(() => {
    if (!workflowSteps.length) return;

    const { nodes: newNodes, edges: newEdges } = createNodesAndEdges({
      workflowSteps,
      leads,
      showAllLeads,
      isSimulating,
      activeNodeId
    });

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

  // Handle node click to show details
  const handleNodeClick: NodeMouseHandler = (event, node) => {
    // Ignore clicks on lead nodes or start/end nodes
    if (node.id.startsWith('lead-') || node.id === 'start' || node.id === 'end' || node.id.startsWith('more-leads-')) {
      return;
    }
    
    setSelectedNode(node);
    setIsPreviewOpen(true);
  };

  // Get step information from selected node
  const getSelectedStep = () => {
    if (!selectedNode || !selectedNode.id.startsWith('step-')) return null;
    
    const stepId = selectedNode.id.replace('step-', '');
    return workflowSteps.find(step => step.id.toString() === stepId);
  };

  // Get leads for the selected step
  const getSelectedStepLeads = () => {
    if (!selectedNode || !leads.length) return [];
    
    // In a real app, you would filter leads based on their current step
    // For now, just return a random subset of leads
    return leads.slice(0, 5).map(lead => ({
      ...lead,
      status: Math.random() > 0.3 ? 'active' : 'pending'
    }));
  };

  const selectedStep = getSelectedStep();
  const stepLeads = getSelectedStepLeads();

  return (
    <div className="h-[800px] w-full border border-gray-200 rounded-lg bg-gray-50 relative">
      <div className="h-12 absolute top-0 left-0 right-0 z-10 bg-white border-b px-4 flex items-center justify-between">
        <h3 className="font-semibold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          Campaign Flow Visualization
        </h3>
        <FlowControls 
          showAllLeads={showAllLeads}
          toggleShowAllLeads={toggleShowAllLeads}
          simulateFlow={simulateFlow}
          isSimulating={isSimulating}
        />
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
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

      {/* Node Preview Sheet */}
      {selectedStep && (
        <StepPreviewSheet
          isOpen={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
          selectedStep={selectedStep}
          stepLeads={stepLeads}
          previewTab={previewTab}
          setPreviewTab={setPreviewTab}
        />
      )}
    </div>
  );
};
