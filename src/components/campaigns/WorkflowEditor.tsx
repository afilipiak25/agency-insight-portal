
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Settings2 } from "lucide-react";
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'start',
    position: { x: 250, y: 0 },
    data: { label: 'Sequence start' },
    type: 'input',
  },
];

export const WorkflowEditor = ({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] h-[600px] p-0">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <h2 className="font-semibold">Anthony's campaign (3)</h2>
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
        <div className="h-[calc(600px-57px)]">
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
      </DialogContent>
    </Dialog>
  );
};
