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
import { LoaderIcon, TriangleAlert } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const DeleteConfirmationModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const isModalOpen = isOpen && type === "deleteConfirmation";
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentUser = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onDeleteClick = async () => {
    startTransition(async () => {
      try {
        // await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/passwords/delete/${data.id}`);

        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/passwords/update?passwordId=${data.id}`, JSON.stringify({
          title: data.title,
          url: data.url == null ? data.url : data.url,
          email: data.email,
          password: data.password,
          userId: currentUser?.user?.id,
          createdAt: data.createdAt,
          isHidden: true,
        }), {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success("Password deleted successfully");
        onClose();
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
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
          <Button className="w-full" variant={"outline"} disabled={isPending} onClick={onClose}>Cancel</Button>
          <Button className="w-full" variant={"destructive"} disabled={isPending} onClick={onDeleteClick}>
            {isPending ? <LoaderIcon className="animate-spin size-5 text-muted-foreground" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteConfirmationModal;
