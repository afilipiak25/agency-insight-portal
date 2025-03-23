
import { Mail, UserPlus, Eye, MessageSquare, Instagram, Plus, Type, FileText, Play, Settings, Info, Copy, ArrowLeft, ArrowRight, Filter, Pin, EyeOff, Trash, Pencil } from "lucide-react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";

interface StepContextMenuProps {
  stepId: number;
  activeContextMenuStep: number | null;
  stepTitle: string;
  setActiveContextMenuStep: (id: number | null) => void;
  handleStepRename: (id: number, title: string) => void;
  openStepDialog: (id: number) => void;
  handleStepDuplicate: (id: number) => void;
  insertNewStep: (id: number, position: 'left' | 'right') => void;
  handleColorChange: (id: number, color: string) => void;
  handleStepDelete: (id: number) => void;
  colorOptions: string[];
}

export const StepContextMenu = ({
  stepId,
  activeContextMenuStep,
  stepTitle,
  setActiveContextMenuStep,
  handleStepRename,
  openStepDialog,
  handleStepDuplicate,
  insertNewStep,
  handleColorChange,
  handleStepDelete,
  colorOptions
}: StepContextMenuProps) => {
  return (
    <ContextMenuContent className="w-56 bg-white">
      <ContextMenuItem 
        onClick={() => {
          setActiveContextMenuStep(stepId);
          setTimeout(() => {
            const input = document.getElementById(`rename-input-${stepId}`);
            if (input) {
              (input as HTMLInputElement).focus();
              (input as HTMLInputElement).select();
            }
          }, 0);
        }}
      >
        <Pencil className="mr-2 h-4 w-4" />
        <span>Rename column</span>
      </ContextMenuItem>
      
      {activeContextMenuStep === stepId ? (
        <div className="px-2 py-1.5">
          <input
            id={`rename-input-${stepId}`}
            type="text"
            className="w-full p-1 border rounded text-sm"
            defaultValue={stepTitle}
            onBlur={(e) => {
              handleStepRename(stepId, e.target.value);
              setActiveContextMenuStep(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleStepRename(stepId, e.currentTarget.value);
                setActiveContextMenuStep(null);
              }
            }}
          />
        </div>
      ) : null}
      
      <ContextMenuItem onClick={() => openStepDialog(stepId)}>
        <Settings className="mr-2 h-4 w-4" />
        <span>Edit column</span>
      </ContextMenuItem>
      
      <ContextMenuItem>
        <Info className="mr-2 h-4 w-4" />
        <span>Edit description</span>
      </ContextMenuItem>
      
      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Change color</span>
        </ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-56 p-2">
          <div className="grid grid-cols-6 gap-1">
            {colorOptions.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full cursor-pointer hover:opacity-80 transition-opacity border border-gray-200"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(stepId, color)}
              />
            ))}
          </div>
        </ContextMenuSubContent>
      </ContextMenuSub>
      
      <ContextMenuItem>
        <Info className="mr-2 h-4 w-4" />
        <span>Run info</span>
      </ContextMenuItem>
      
      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <Play className="mr-2 h-4 w-4" />
          <span>Run column</span>
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Run for all leads</ContextMenuItem>
          <ContextMenuItem>Run for selected leads</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      
      <ContextMenuItem onClick={() => handleStepDuplicate(stepId)}>
        <Copy className="mr-2 h-4 w-4" />
        <span>Duplicate</span>
      </ContextMenuItem>
      
      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Insert left</span>
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onClick={() => insertNewStep(stepId, 'left')}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Email</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => insertNewStep(stepId, 'left')}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Message</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => insertNewStep(stepId, 'left')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>AI Template</span>
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      
      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <ArrowRight className="mr-2 h-4 w-4" />
          <span>Insert right</span>
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onClick={() => insertNewStep(stepId, 'right')}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Email</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => insertNewStep(stepId, 'right')}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Message</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => insertNewStep(stepId, 'right')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>AI Template</span>
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      
      <ContextMenuSeparator />
      
      <ContextMenuItem>
        <Filter className="mr-2 h-4 w-4" />
        <span>Filter on this column</span>
      </ContextMenuItem>
      
      <ContextMenuItem>
        <Pin className="mr-2 h-4 w-4" />
        <span>Pin</span>
      </ContextMenuItem>
      
      <ContextMenuItem>
        <EyeOff className="mr-2 h-4 w-4" />
        <span>Hide</span>
      </ContextMenuItem>
      
      <ContextMenuSeparator />
      
      <ContextMenuItem 
        className="text-red-600 focus:text-red-600 focus:bg-red-50"
        onClick={() => handleStepDelete(stepId)}
      >
        <Trash className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </ContextMenuItem>
    </ContextMenuContent>
  );
};
