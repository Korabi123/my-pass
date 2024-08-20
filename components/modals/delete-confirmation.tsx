"use client";

import { Button } from "../ui/button";
import { useModalStore } from "@/hooks/useModalStore";
import { useState, useEffect, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PasswordCard from "../password-card";
import { TriangleAlert } from "lucide-react";

const DeleteConfirmationModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const isModalOpen = isOpen && type === "deleteConfirmation";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[580px] w-full">
        <div className="flex gap-4">
          <div className="size-12 inline-flex items-center justify-center rounded-full bg-red-500/10 p-2">
            <TriangleAlert className="size-7 text-red-500" />
          </div>
          <div className="flex flex-col gap-2">
            <DialogHeader className="space-y-0">
              <DialogTitle className="font-semibold text-base md:text-lg">Are you sure you want to delete this password?</DialogTitle>
              <DialogDescription className="md:text-sm text-xs">This action cannot be undone.</DialogDescription>
            </DialogHeader>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" variant={"outline"} onClick={onClose}>Cancel</Button>
          <Button className="w-full" variant={"destructive"} onClick={onClose}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteConfirmationModal;
