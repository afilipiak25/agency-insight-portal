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
import { ArrowLeft, Plus, Settings2, ZoomIn, ZoomOut, MoreHorizontal, Clock, Mail, MessageSquare, Mic, UserPlus, PhoneCall, List, Code, Send, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import '@xyflow/react/dist/style.css';

interface WorkflowEditorProps {
  initialModuleType: string;
  onBack: () => void;
}

const CustomNode = ({ data }: { data: any }) => {
  return (
    <div className={`p-4 rounded-lg bg-white border ${data.isSelected ? 'border-red-200' : 'border-gray-100'} shadow-sm min-w-[280px]`}>
      {data.timing && (
        <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
          <Clock className="w-4 h-4" />
          <span>Send immediately</span>
          <Pencil className="w-4 h-4 ml-auto text-gray-400" />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            {data.icon}
          </div>
          <div className="text-left">
            <div className="font-medium">{data.label}</div>
            {data.subtitle && (
              <div className="text-sm text-red-500">{data.subtitle}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

const getModuleIcon = (type: string) => {
  switch (type) {
    case "Email":
      return <Mail className="w-5 h-5 text-green-600" />;
    case "Chat message":
      return <MessageSquare className="w-5 h-5 text-blue-600" />;
    case "Voice message":
      return <Mic className="w-5 h-5 text-blue-600" />;
    case "Invitation":
      return <UserPlus className="w-5 h-5 text-blue-600" />;
    case "Call":
      return <PhoneCall className="w-5 h-5 text-red-600" />;
    case "Manual task":
      return <List className="w-5 h-5 text-red-600" />;
    case "Call API":
      return <Code className="w-5 h-5 text-blue-600" />;
    case "Send to campaign":
      return <Send className="w-5 h-5 text-gray-600" />;
    default:
      return <Mail className="w-5 h-5 text-gray-600" />;
  }
};

const getModuleSubtitle = (type: string) => {
  switch (type) {
    case "Email":
      return "Action needed";
    case "Chat message":
    case "Voice message":
    case "Invitation":
      return "Send on LinkedIn";
    case "Call":
    case "Manual task":
      return "Create a task";
    case "Call API":
      return "Call an API";
    case "Send to campaign":
      return "Transfer to campaign";
    default:
      return "";
  }
};

export const WorkflowEditor = ({ initialModuleType, onBack }: WorkflowEditorProps) => {
  const initialNodes = [
    {
      id: 'start',
      position: { x: 350, y: 50 },
      data: { 
        label: 'Sequence start',
        icon: <Mail className="w-5 h-5 text-gray-400" />,
      },
      type: 'custom',
    },
    {
      id: 'module-1',
      position: { x: 350, y: 200 },
      data: { 
        label: initialModuleType,
        subtitle: getModuleSubtitle(initialModuleType),
        timing: true,
        icon: getModuleIcon(initialModuleType),
        isSelected: true
      },
      type: 'custom',
    }
  ];

  const initialEdges = [
    {
      id: 'start-to-module',
      source: 'start',
      target: 'module-1',
      type: 'smoothstep',
      animated: true,
    }
  ];

  const nodeTypes = {
    custom: CustomNode,
  };

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
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-semibold">Workflow Editor</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Mail className="w-4 h-4" />
            Upload CSV
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100">
            <Mail className="w-4 h-4" />
            Generate Sample Email
          </Button>
        </div>
      </div>
      <div className="h-[calc(100vh-12rem)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Panel position="top-right" className="bg-white rounded-lg shadow-sm space-x-2">
            <Button variant="ghost" size="icon">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ZoomOut className="w-4 h-4" />
            </Button>
          </Panel>
          <Background color="#e5e5e5" gap={16} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};
