
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from '@xyflow/react';
import { ArrowLeft, Plus, Settings2 } from "lucide-react";
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
      position: { x: 250, y: 0 },
      data: { label: 'Sequence start' },
      type: 'input',
    },
    {
      id: 'initial-module',
      position: { x: 250, y: 100 },
      data: { label: initialModuleType },
    }
  ];

  const initialEdges = [
    {
      id: 'start-to-module',
      source: 'start',
      target: 'initial-module',
      type: 'smoothstep',
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  };

  return (
    <div className="h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to modules
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <h2 className="font-semibold">Anthony's campaign (3)</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Settings2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
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
          className="bg-blue-50/20"
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};
