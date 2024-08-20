"use client";

import * as z from "zod";

import { Button } from "../ui/button";
import { useModalStore } from "@/hooks/useModalStore";
import { useState, useEffect, useTransition } from "react";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PasswordCard from "../password-card";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  title: z.string().min(1).max(100),
  url: z.string().min(1).max(100),
  imgUrl: z.string().min(1).max(100),
  loginEmail: z.string().min(1).max(100),
});

const EditPasswordSheet = () => {
  const { isOpen, type, onClose, data, onOpen } = useModalStore();
  const isSheetOpen = isOpen && type === "editPasswordSheet";
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: data.title,
      url: data.url,
      imgUrl: data.imgUrl,
      loginEmail: data.loginEmail,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    //TODO: Create a new password through the API
    onClose();
    onOpen("viewSavedPassword", { ...data });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[500px] w-full">
        <SheetHeader>
          <SheetTitle>Edit Password</SheetTitle>
          <SheetDescription>Edit a saved password</SheetDescription>
        </SheetHeader>
        <div className="mt-8">
          <PasswordCard
            imgSrc={data.imgUrl}
            loginEmail={data.loginEmail}
            passId={data.passId}
            title={data.title}
            url={data.url}
            isBig
          />
          <div className="mt-8">
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <Input {...field} placeholder="Name" required />
                  )}
                />
                <FormField
                  control={form.control}
                  name="loginEmail"
                  render={({ field }) => (
                    <Input {...field} placeholder="Email" required />
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <Input {...field} placeholder="Url" required />
                  )}
                />
                <FormField
                  control={form.control}
                  name="imgUrl"
                  render={({ field }) => (
                    <Input {...field} placeholder="Image Url" required />
                  )}
                />
                <div className="flex md:flex-row flex-col gap-4">
                <Button variant={"outline"} className="w-full" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button className="w-full" type="submit">
                  Save
                </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditPasswordSheet;
