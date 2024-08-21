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
import PasswordCard from "../passwords/password-card";
import { useForm } from "react-hook-form";
import axios from "axios";
import { uuid } from "uuidv4";
import { useUser } from "@clerk/nextjs";
import { currentMonth } from "@/lib/currentMonth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  url: z.string().min(1, "Url is required").max(100, "Url is too long"),
  loginEmail: z.string().min(1, "Email is required").max(100, "Email is too long"),
  password: z.string().min(1, "Password is required").max(100, "Password is too long"),
});

const EditPasswordSheet = () => {
  const router = useRouter();
  const currentUser = useUser();

  const { isOpen, type, onClose, data, onOpen } = useModalStore();
  const isSheetOpen = isOpen && type === "editPasswordSheet";
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: data.title,
      url: data.url,
      loginEmail: data.email,
      password: data.password,
    },
  });

  const passwordId = data.id;

  const previousData = data;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/passwords/update?passwordId=${passwordId}`, JSON.stringify({
          title: data.title,
          url: data.url == null ? previousData.url : data.url,
          email: data.loginEmail,
          password: data.password == null ? previousData.password : data.password,
          userId: currentUser?.user?.id,
          createdAt: previousData.createdAt,
        }), {
          headers: {
            "Content-Type": "application/json",
          },
        });


        onClose();
        toast.success("Password updated successfully");
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
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
            loginEmail={data.email}
            passId={data.id}
            title={data.title}
            url={data.url}
            createdAt={data.createdAt}
            createdAtMonth={data.createdAtMonth}
            password={data.password}
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
                  disabled={isPending}
                  render={({ field }) => (
                    <Input {...field} placeholder="Name" required defaultValue={data.title} />
                  )}
                />
                <FormField
                  control={form.control}
                  name="loginEmail"
                  disabled={isPending}
                  render={({ field }) => (
                    <Input {...field} placeholder="Email" required defaultValue={data.email} />
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  disabled={isPending}
                  render={({ field }) => (
                    <Input {...field} placeholder="Url" required defaultValue={data.url} />
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  disabled={isPending}
                  render={({ field }) => (
                    <Input {...field} placeholder="Password" required defaultValue={data.password} />
                  )}
                />
                <div className="flex md:flex-row flex-col gap-4">
                  <Button disabled={isPending} variant={"outline"} className="w-full" type="button" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button disabled={isPending} className="w-full" type="submit">
                    {isPending ? <LoaderIcon className="animate-spin size-5 text-muted-foreground" /> : "Save"}
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
