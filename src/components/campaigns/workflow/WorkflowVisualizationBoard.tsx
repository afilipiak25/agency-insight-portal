
import React, { useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent } from '@/components/ui/card';
import { WorkflowStep } from '../types/workflow';
import { ApolloLead } from '../types/apollo-filters';
import { Mail, Linkedin, Eye, Instagram, User, Play, Flag, CheckCircle, Clock } from 'lucide-react';
import { useWorkflowSteps } from '../lead-table/useWorkflowSteps';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface WorkflowVisualizationBoardProps {
  leads?: ApolloLead[];
}

const getIconByType = (type: string) => {
  switch (type) {
    case 'email':
      return <Mail className="w-4 h-4 text-purple-600" />;
    case 'linkedin':
      return <Linkedin className="w-4 h-4 text-blue-600" />;
    case 'profile-visit':
      return <Eye className="w-4 h-4 text-gray-600" />;
    case 'instagram':
      return <Instagram className="w-4 h-4 text-pink-600" />;
    default:
      return <Mail className="w-4 h-4 text-purple-600" />;
  }
};

const WorkflowNode = ({ data }: { data: any }) => {
  return (
    <div className={`p-3 rounded-lg shadow-md bg-white border ${data.selected ? 'border-purple-400 ring-2 ring-purple-200' : 'border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          data.type === 'email' ? 'bg-purple-100' : 
          data.type === 'linkedin' ? 'bg-blue-100' : 
          data.type === 'profile-visit' ? 'bg-gray-100' : 
          data.type === 'instagram' ? 'bg-pink-100' : 
          data.type === 'start' ? 'bg-green-100' : 
          data.type === 'end' ? 'bg-orange-100' : 'bg-gray-100'
        }`}>
          {data.icon}
        </div>
        <div>
          <div className="font-medium text-sm">{data.label}</div>
          {data.waitDays !== undefined && (
            <div className="text-xs text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {data.waitDays} days
            </div>
          )}
        </div>
      </div>
      
      {data.content && (
        <div className="text-xs text-gray-600 mt-1 border-t pt-1 line-clamp-2" 
             dangerouslySetInnerHTML={{ __html: data.content }} />
      )}
      
      {data.stats && (
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-2.5 h-2.5 mr-1" />
            {data.stats.delivered}% Delivered
          </Badge>
          <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
            <Eye className="w-2.5 h-2.5 mr-1" />
            {data.stats.opened}% Opened
          </Badge>
        </div>
      )}
    </div>
  );
};

const LeadNode = ({ data }: { data: any }) => {
  return (
    <div className="p-3 rounded-lg shadow-md bg-white border border-orange-200 max-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="truncate">
          <div className="font-medium text-sm truncate">{data.name}</div>
          {data.position && (
            <div className="text-xs text-gray-500 truncate">{data.position}</div>
          )}
        </div>
      </div>
      
      {data.company && (
        <div className="text-xs flex items-center text-gray-600 mt-1">
          <div className="truncate">{data.company}</div>
          {data.score && (
            <span className="ml-1 bg-orange-100 text-orange-700 px-1 rounded-full text-[10px]">{data.score}</span>
          )}
        </div>
      )}
    </div>
  );
};

export const WorkflowVisualizationBoard: React.FC<WorkflowVisualizationBoardProps> = ({ leads = [] }) => {
  const { workflowSteps } = useWorkflowSteps();
  const nodeTypes = React.useMemo(() => ({ 
    workflowNode: WorkflowNode,
    leadNode: LeadNode 
  }), []);
  
  // Create nodes from workflow steps
  const initialNodes: Node[] = [
    {
      id: 'start',
      type: 'workflowNode',
      position: { x: 250, y: 50 },
      data: {
        label: 'Campaign Start',
        type: 'start',
        icon: <Play className="w-4 h-4 text-green-600" />
      }
    },
    ...workflowSteps.map((step, index) => ({
      id: `step-${step.id}`,
      type: 'workflowNode',
      position: { x: 250, y: 150 + (index * 120) },
      data: {
        label: step.title,
        type: step.type,
        icon: getIconByType(step.type),
        content: step.content,
        waitDays: step.waitDays,
        stats: {
          delivered: 92 - (index * 5),
          opened: 45 - (index * 7)
        }
      }
    })),
    {
      id: 'end',
      type: 'workflowNode',
      position: { x: 250, y: 150 + (workflowSteps.length * 120) },
      data: {
        label: 'Campaign End',
        type: 'end',
        icon: <Flag className="w-4 h-4 text-orange-600" />
      }
    }
  ];
  
  // Add lead nodes on the right side
  const leadNodes = leads.slice(0, 3).map((lead, index) => ({
    id: `lead-${lead.id || index}`,
    type: 'leadNode',
    position: { x: 500, y: 150 + (index * 150) },
    data: {
      name: lead.name,
      position: lead.position,
      company: lead.company,
      score: lead.score || Math.floor(Math.random() * 100),
    }
  }));
  
  // Combine all nodes
  const allInitialNodes = [...initialNodes, ...leadNodes];
  
  // Create edges connecting workflow steps
  const initialEdges: Edge[] = [
    {
      id: 'edge-start',
      source: 'start',
      target: `step-${workflowSteps[0]?.id || 1}`,
      animated: true,
      style: { stroke: '#9333ea' }
    },
    ...workflowSteps.slice(0, -1).map((step, index) => ({
      id: `edge-${step.id}`,
      source: `step-${step.id}`,
      target: `step-${workflowSteps[index + 1].id}`,
      animated: true,
      style: { stroke: '#9333ea' }
    }))
  ];
  
  // Add end edge if we have workflow steps
  if (workflowSteps.length > 0) {
    initialEdges.push({
      id: 'edge-end',
      source: `step-${workflowSteps[workflowSteps.length - 1].id}`,
      target: 'end',
      animated: true,
      style: { stroke: '#9333ea' }
    });
  }
  
  // Add some lead connection edges
  const leadEdges = leads.slice(0, 3).map((lead, index) => ({
    id: `lead-edge-${lead.id || index}`,
    source: `step-${workflowSteps[Math.min(index, workflowSteps.length - 1)]?.id || 1}`,
    target: `lead-${lead.id || index}`,
    animated: true,
    type: 'straight',
    style: { stroke: '#f97316', strokeDasharray: '5,5' }
  }));
  
  // Combine all edges
  const allInitialEdges = [...initialEdges, ...leadEdges];
  
  const [nodes, setNodes, onNodesChange] = useNodesState(allInitialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(allInitialEdges);
  
  const onConnect = React.useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Card className="mt-6 overflow-hidden">
      <CardContent className="p-0">
        <div className="h-[600px] w-full border-t">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-right"
            minZoom={0.5}
            maxZoom={1.5}
            defaultEdgeOptions={{ 
              type: 'smoothstep',
              style: { strokeWidth: 2 }
            }}
          >
            <Background color="#f9fafb" gap={16} />
            <Controls position="bottom-right" />
            <MiniMap 
              nodeStrokeWidth={3}
              nodeColor={(node) => {
                if (node.type === 'leadNode') return '#f97316';
                if (node.id === 'start') return '#10b981';
                if (node.id === 'end') return '#f97316';
                return '#9333ea';
              }}
              maskColor="rgba(255, 255, 255, 0.5)"
              position="top-right"
            />
            <Panel position="top-left" className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-2 gradient-text">Campaign Flow Visualization</h2>
              <p className="text-sm text-gray-600">Interactive visualization of your campaign workflow and leads</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Show All Leads
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <Play className="w-3.5 h-3.5 mr-1.5" />
                  Simulate Flow
                </Button>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </CardContent>
    </Card>
  );
};
