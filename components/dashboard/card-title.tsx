"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { CardHeader, CardTitle as CardTitleShadcn } from "../ui/card";
import { useModalStore } from "@/hooks/useModalStore";

const CardTitle = () => {
  const { onOpen } = useModalStore();

  return (
    <CardHeader className="flex justify-between">
      <CardTitleShadcn>Recently Added Passwords</CardTitleShadcn>
      <Button onClick={() => onOpen("createPassword")} variant={"ghost"} size={"icon"}>
        <Plus className="size-6 text-muted-foreground/90" />
      </Button>
    </CardHeader>
  );
};

export default CardTitle;
