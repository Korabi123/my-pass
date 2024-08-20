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

const ViewPasswordModal = () => {
  const { isOpen, type, onClose, data, onOpen } = useModalStore();
  const isModalOpen = isOpen && type === "viewSavedPassword";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onClickDeleteButton = () => {
    onClose();
    onOpen("deleteConfirmation", { ...data });
  }

  const onClickEditButton = () => {
    onClose();
    onOpen("editPasswordSheet", { ...data });
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] w-full p-0">
        <DialogHeader className="px-8 py-4">
          <DialogTitle>View Password</DialogTitle>
          <DialogDescription>View a saved password</DialogDescription>
        </DialogHeader>
        <div className="mt-2 px-8">
          <PasswordCard
            imgSrc={data.imgUrl}
            loginEmail={data.loginEmail}
            passId={data.passId}
            title={data.title}
            url={data.url}
            isBig
          />
          <div className="mt-8">
            <div className="flex flex-col gap-4">
              <Label htmlFor="">Name</Label>
              <Input readOnly value={data.title} />
              <Label>Email</Label>
              <Input readOnly value={data.loginEmail} />
              <Label>Url</Label>
              <Input readOnly value={data.url} />
              <Label>Created At</Label>
              <Input readOnly value={data.createdAt} />
            </div>
          </div>
        </div>
        <DialogFooter className="border-t-[1.5px] p-4 flex justify-end">
          <Button variant="destructive" className="w-[100px]" onClick={onClickDeleteButton}>
            Delete
          </Button>
          <Button className="w-[100px]" onClick={onClickEditButton}>
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ViewPasswordModal;
