"use client";

import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { useModalStore } from "@/hooks/use-modal-store";
export const SettingsModal = () => {
  const { isOpen, onClose, type } = useModalStore();

  const openSettings = isOpen && type === "settings";
  return (
    <Dialog open={openSettings} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label> Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground"></span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
