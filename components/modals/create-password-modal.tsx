"use client";

import * as z from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";
import { uuid } from "uuidv4";
import { LoaderIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { currentMonth } from "@/lib/currentMonth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  url: z.string().min(1, "Url is required").max(100, "Url is too long"),
  loginEmail: z
    .string()
    .min(1, "Email is required")
    .max(100, "Email is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password is too long"),
});

const CreatePasswordModal = () => {
  const router = useRouter();
  const currentUser = useUser();

  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { onOpen, data, onClose, type, isOpen } = useModalStore();
  const isModalOpen = isOpen && type === "createPassword";

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "",
      url: "",
      loginEmail: "",
      password: "",
    },
  });


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const jsonData = JSON.stringify([{
      title: data.title,
      email: data.loginEmail,
      id: uuid(),
      userId: currentUser?.user?.id,
      url: data.url,
      password: data.password,
      createdAt: new Date().toISOString(),
      createdAtMonth: currentMonth(),
    }]);

    startTransition(async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/create`,
          jsonData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        onClose();
        toast.success("Password created successfully");
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
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] w-full p-0">
        <DialogHeader className="p-8">
          <DialogTitle>Create Password</DialogTitle>
          <DialogDescription>Create a new password</DialogDescription>
        </DialogHeader>

        <div className="flex px-8 flex-col gap-4">
          <Form {...form}>
            <form
              className="space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Google Account"
                        {...field}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="https://myaccount.google.com"
                        {...field}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loginEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="myaccount@gmail.com"
                        {...field}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                        {...field}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="border-t-[1.5px] p-4 flex justify-end">
                <Button disabled={isPending} variant="outline" type="reset" className="w-[100px]" onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={isPending} className="w-[100px]" type="submit">
                  {isPending ? <LoaderIcon className="animate-spin size-5 text-muted-foreground" /> : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default CreatePasswordModal;
