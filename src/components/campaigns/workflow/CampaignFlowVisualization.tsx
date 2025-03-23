
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
  Panel,
  NodeMouseHandler
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WorkflowStep } from '../types/workflow';
import { Mail, Linkedin, Eye, Instagram, Play, Users, ZoomIn, ZoomOut, MessageSquare, Calendar, BarChart3, Pencil, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

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

  // Handle node click to show details
  const handleNodeClick: NodeMouseHandler = (event, node) => {
    // Ignore clicks on lead nodes or start/end nodes
    if (node.id.startsWith('lead-') || node.id === 'start' || node.id === 'end' || node.id.startsWith('more-leads-')) {
      return;
    }
    
    setSelectedNode(node);
    setIsPreviewOpen(true);
  };

  // Close preview dialog
  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedNode(null);
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
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={toggleShowAllLeads}
            className="flex items-center gap-1 bg-white"
          >
            <Users className="w-4 h-4" />
            {showAllLeads ? 'Hide' : 'Show All'} Leads
          </Button>
          <Button 
            size="sm" 
            variant={isSimulating ? "secondary" : "outline"}
            onClick={simulateFlow}
            disabled={isSimulating}
            className="flex items-center gap-1 bg-white"
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
      <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <SheetContent className="sm:max-w-[600px] p-0 overflow-y-auto">
          {selectedStep && (
            <>
              <SheetHeader className="p-6 pb-2 border-b">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedStep.channel === 'email' ? 'bg-pink-100' : 
                    selectedStep.channel === 'linkedin' ? 'bg-blue-100' : 
                    selectedStep.channel === 'profile-visit' ? 'bg-gray-100' : 
                    selectedStep.channel === 'instagram' ? 'bg-pink-200' : 'bg-purple-100'
                  }`}>
                    {getStepIcon(selectedStep)}
                  </div>
                  <div>
                    <SheetTitle>{selectedStep.title}</SheetTitle>
                    <SheetDescription>
                      {selectedStep.waitDays > 0 && `Sent ${selectedStep.waitDays} days after previous step`}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              
              <Tabs defaultValue={previewTab} className="w-full" onValueChange={setPreviewTab}>
                <TabsList className="grid grid-cols-3 p-4">
                  <TabsTrigger value="content" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Content</span>
                  </TabsTrigger>
                  <TabsTrigger value="metrics" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Metrics</span>
                  </TabsTrigger>
                  <TabsTrigger value="leads" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Leads</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Content Tab */}
                <TabsContent value="content" className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-sm font-semibold mb-2 text-gray-500">Message Content</h3>
                      <div className="prose prose-sm max-w-none">
                        {selectedStep.content ? (
                          <div className="text-gray-800 whitespace-pre-line">
                            {selectedStep.content}
                          </div>
                        ) : (
                          <div className="text-gray-400 italic">No content available for preview</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold text-gray-500">Template Variables</h3>
                        <Button size="sm" variant="ghost" className="h-8 text-xs">
                          <Pencil className="h-3 w-3 mr-1" /> Edit
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 p-2 rounded text-xs">
                          <span className="font-mono text-blue-600">#FirstName#</span>
                          <span className="text-gray-400 ml-2">First name</span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded text-xs">
                          <span className="font-mono text-blue-600">#CompanyName#</span>
                          <span className="text-gray-400 ml-2">Company</span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded text-xs">
                          <span className="font-mono text-blue-600">#JobTitle#</span>
                          <span className="text-gray-400 ml-2">Job title</span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded text-xs">
                          <span className="font-mono text-blue-600">#Industry#</span>
                          <span className="text-gray-400 ml-2">Industry</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Sending Schedule</h3>
                        <div className="flex items-center mt-1 text-xs text-gray-600">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {selectedStep.waitDays === 0 
                              ? 'Sent immediately after campaign start' 
                              : `Sent ${selectedStep.waitDays} days after previous step`}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        <Pencil className="h-3 w-3 mr-1" /> Adjust Timing
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Metrics Tab */}
                <TabsContent value="metrics" className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-sm font-semibold mb-3 text-gray-500">Performance Metrics</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Delivered</span>
                            <span className="text-sm font-medium text-green-600">92%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Opened</span>
                            <span className="text-sm font-medium text-blue-600">53%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '53%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Clicked</span>
                            <span className="text-sm font-medium text-purple-600">27%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '27%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Replied</span>
                            <span className="text-sm font-medium text-orange-600">12%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: '12%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg border p-4">
                        <h3 className="text-xs font-semibold mb-2 text-gray-500">Best Performing Time</h3>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                          <div>
                            <div className="font-medium">Tuesday</div>
                            <div className="text-xs text-gray-500">10:00 - 11:00 AM</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg border p-4">
                        <h3 className="text-xs font-semibold mb-2 text-gray-500">Avg. Response Time</h3>
                        <div className="flex items-center">
                          <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
                          <div>
                            <div className="font-medium">4.5 hours</div>
                            <div className="text-xs text-gray-500">From opening</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Leads Tab */}
                <TabsContent value="leads" className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg border">
                      <div className="p-3 border-b">
                        <h3 className="text-sm font-semibold text-gray-700">Leads in this step</h3>
                      </div>
                      <div className="divide-y">
                        {stepLeads.length > 0 ? (
                          stepLeads.map((lead, index) => (
                            <div key={index} className="p-3 hover:bg-gray-50">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                    <User className="h-4 w-4 text-gray-500" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm">{lead.firstName} {lead.lastName}</div>
                                    <div className="text-xs text-gray-500">{lead.jobTitle} at {lead.companyName}</div>
                                  </div>
                                </div>
                                <Badge variant={lead.status === 'active' ? 'green' : 'blue'} className="text-xs">
                                  {lead.status === 'active' ? 'Active' : 'Pending'}
                                </Badge>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center">
                            <p className="text-sm text-gray-500">No leads have reached this step yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Users className="h-3.5 w-3.5 mr-1.5" /> View All Leads
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs text-purple-600 border-purple-200 hover:bg-purple-50">
                        <BarChart3 className="h-3.5 w-3.5 mr-1.5" /> Lead Analysis
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="p-4 border-t mt-auto">
                <div className="flex justify-between">
                  <Button variant="outline" onClick={closePreview}>
                    Close
                  </Button>
                  <Button variant="purple" className="gap-1">
                    <Pencil className="h-4 w-4" /> Edit Step
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
