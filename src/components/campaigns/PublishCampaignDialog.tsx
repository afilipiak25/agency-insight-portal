
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface PublishCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignName: string;
  onCampaignNameChange: (name: string) => void;
  onPublish: () => void;
}

export const PublishCampaignDialog = ({
  open,
  onOpenChange,
  campaignName,
  onCampaignNameChange,
  onPublish,
}: PublishCampaignDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="gradient-text">Kampagne veröffentlichen</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <label className="text-sm font-medium mb-2 block">
            Kampagnenname
          </label>
          <Input
            value={campaignName}
            onChange={(e) => onCampaignNameChange(e.target.value)}
            placeholder="z.B. Q2 Sales Campaign 2024"
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Abbrechen
          </Button>
          <Button
            onClick={onPublish}
            variant="default"
          >
            Veröffentlichen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
