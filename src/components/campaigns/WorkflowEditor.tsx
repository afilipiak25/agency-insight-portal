import * as React from 'react';
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
import { ArrowLeft, Plus, Mail, MessageSquare, Mic, UserPlus, PhoneCall, List, Code, Send, MoreHorizontal, Clock, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import '@xyflow/react/dist/style.css';

interface WorkflowEditorProps {
  initialModuleType: string;
  onBack: () => void;
}

const CustomNode = ({ data }: { data: any }) => {
  return (
    <div className={`p-4 rounded-lg bg-white border ${data.isSelected ? 'border-blue-200' : 'border-gray-100'} shadow-sm min-w-[280px] ${data.isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
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
              <div className="text-sm text-gray-500">{data.subtitle}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      {data.isSelected && data.content && (
        <div className="mt-4 pt-4 border-t">
          <Textarea 
            value={data.content}
            onChange={(e) => data.onContentChange?.(e.target.value)}
            placeholder="Enter your message content..."
            className="min-h-[100px] w-full"
          />
        </div>
      )}
    </div>
  );
};

const AddModuleButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="relative flex justify-center my-4">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gray-200" />
      <Button 
        variant="outline" 
        size="icon" 
        className="relative z-10 rounded-full border-dashed border-2 bg-white hover:border-blue-500 hover:text-blue-500"
        onClick={onClick}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

const ModuleSelector = ({ onSelect }: { onSelect: (type: string) => void }) => {
  const moduleTypes = [
    { type: "Email", icon: <Mail className="w-5 h-5 text-green-600" />, label: "Email", subtitle: "Send automatic email" },
    { type: "Chat message", icon: <MessageSquare className="w-5 h-5 text-blue-600" />, label: "Chat message", subtitle: "Send on LinkedIn" },
    { type: "Voice message", icon: <Mic className="w-5 h-5 text-blue-600" />, label: "Voice message", subtitle: "Send on LinkedIn" },
    { type: "Call", icon: <PhoneCall className="w-5 h-5 text-red-600" />, label: "Call", subtitle: "Create a task" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {moduleTypes.map((module) => (
        <Button
          key={module.type}
          variant="outline"
          className="h-auto p-4 flex flex-col items-center gap-2 hover:border-blue-500"
          onClick={() => onSelect(module.type)}
        >
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
            {module.icon}
          </div>
          <div className="text-center">
            <div className="font-medium">{module.label}</div>
            <div className="text-xs text-gray-500">{module.subtitle}</div>
          </div>
        </Button>
      ))}
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

export const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ initialModuleType, onBack }) => {
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>("module-1");
  const [nodeContents, setNodeContents] = React.useState<{[key: string]: string}>({
    "module-1": "" // Initial content for the first module
  });

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
        isSelected: true,
        content: nodeContents["module-1"],
        onContentChange: (content: string) => handleContentChange("module-1", content)
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
  const [isOpen, setIsOpen] = React.useState(false);

  const handleContentChange = (nodeId: string, content: string) => {
    setNodeContents(prev => ({
      ...prev,
      [nodeId]: content
    }));
    
    // Update node data with new content
    setNodes(nds => nds.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            content
          }
        };
      }
      return node;
    }));
  };

  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  };

  const onNodeClick = (_: any, node: any) => {
    // Deselect all nodes first
    setNodes(nds => nds.map(n => ({
      ...n,
      data: {
        ...n.data,
        isSelected: n.id === node.id
      }
    })));
    setSelectedNodeId(node.id);
  };

  const addNewModule = (type: string) => {
    const newNodeId = `module-${nodes.length + 1}`;
    const lastNodeId = nodes[nodes.length - 1].id;
    const lastNodeY = nodes[nodes.length - 1].position.y;

    // Initialize content for the new node
    setNodeContents(prev => ({
      ...prev,
      [newNodeId]: ""
    }));

    // Deselect all existing nodes and select the new one
    setNodes(nds => nds.map(node => ({
      ...node,
      data: {
        ...node.data,
        isSelected: false
      }
    })));

    const newNode = {
      id: newNodeId,
      position: { x: 350, y: lastNodeY + 200 },
      data: {
        label: type,
        subtitle: getModuleSubtitle(type),
        timing: true,
        icon: getModuleIcon(type),
        isSelected: true,
        content: "",
        onContentChange: (content: string) => handleContentChange(newNodeId, content)
      },
      type: 'custom',
    };

    const newEdge = {
      id: `e${lastNodeId}-${newNodeId}`,
      source: lastNodeId,
      target: newNodeId,
      type: 'smoothstep',
      animated: true,
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
    setSelectedNodeId(newNodeId);
    setIsOpen(false);
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
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Panel position="bottom-center" className="w-full pointer-events-none">
            <div className="max-w-[600px] mx-auto pointer-events-auto">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <div className="relative flex justify-center my-4">
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gray-200" />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="relative z-10 rounded-full border-dashed border-2 bg-white hover:border-blue-500 hover:text-blue-500"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add new module</DialogTitle>
                    <DialogDescription>
                      Choose the type of module you want to add to your workflow
                    </DialogDescription>
                  </DialogHeader>
                  <ModuleSelector onSelect={addNewModule} />
                </DialogContent>
              </Dialog>
            </div>
          </Panel>
          <Background color="#e5e5e5" gap={16} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};
