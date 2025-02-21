
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
} from '@xyflow/react';
import { ArrowLeft, Plus, Settings2, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../ui/button";
import '@xyflow/react/dist/style.css';

interface WorkflowEditorProps {
  initialModuleType: string;
  onBack: () => void;
}

export const WorkflowEditor = ({ initialModuleType, onBack }: WorkflowEditorProps) => {
  const initialNodes = [
    {
      id: 'start',
      position: { x: 350, y: 50 },
      data: { label: 'Sequence start' },
      type: 'input',
      className: 'bg-white border-2 border-gray-200 rounded-lg',
    },
    {
      id: 'initial-module',
      position: { x: 350, y: 150 },
      data: { 
        label: initialModuleType,
        subtitle: initialModuleType === 'Email' ? 'Action needed' : 'Send on LinkedIn'
      },
      className: 'bg-white border-2 border-red-200 rounded-lg min-w-[200px]',
    }
  ];

  const initialEdges = [
    {
      id: 'start-to-module',
      source: 'start',
      target: 'initial-module',
      type: 'smoothstep',
      animated: true,
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to modules
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <h2 className="font-semibold">Workflow Editor</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Settings2 className="w-5 h-5 text-gray-600" />
          </Button>
          <Button variant="outline" size="icon">
            <Plus className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
      <div className="h-[calc(100%-73px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="bg-gray-50"
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Panel position="top-right" className="bg-white p-2 rounded-lg shadow-sm space-x-2">
            <Button variant="outline" size="icon">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ZoomOut className="w-4 h-4" />
            </Button>
          </Panel>
          <Background color="#e5e5e5" />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};
