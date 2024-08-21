"use client";

import { useModalStore } from "@/hooks/useModalStore";
import { Button } from "./ui/button";
import React, { Component } from "react";
import { Icon } from "lucide-react";

interface OpenModalButtonProps {
  type: "viewSavedPassword" | "deleteConfirmation" | "editPasswordSheet" | "createPassword";
  icon: any;
}

const OpenModalButton = ({
  type,
  icon
}: OpenModalButtonProps) => {
  const { onOpen } = useModalStore();

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() =>
        onOpen(type, {
          createdAt: "",
          imgUrl: "",
          loginEmail: "",
          passId: "",
          password: "",
          title: "",
          url: "",
        })
      }
    >
      {icon}
    </Button>
  );
}

export default OpenModalButton;
