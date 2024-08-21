"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/useModalStore";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface PasswordCardProps {
  passId: string | undefined;
  loginEmail: string | undefined;
  title: string | undefined;
  imgSrc: string | undefined;
  url: string | undefined;
  password?: string | undefined;
  createdAt?: string | undefined;
  createdAtMonth?: string | undefined;
  noPassword?: boolean;
  isBig?: boolean;
}

const PasswordCard = ({
  passId,
  loginEmail,
  title,
  imgSrc,
  url,
  noPassword = false,
  isBig = false,
  password,
  createdAt,
  createdAtMonth,
}: PasswordCardProps) => {
  const { onOpen } = useModalStore();
  const router = useRouter();

  if (noPassword) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <img src="/no-result.png" alt="" className="h-[220px] w-auto" />
        <h3 className="text-lg font-medium mt-4">
          No passwords created {":("}
        </h3>
        <p className="text-sm font-light text-muted-foreground">
          Create your first password to get started.
        </p>
      </div>
    );
  } else {
    return (
      <>
        {isBig ? (
          <div id="card" className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="size-12 flex items-center justify-center rounded-md bg-muted-foreground/15">
                <img src={imgSrc} alt="site favicon" className="size-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold truncate w-[90%]">{title}</h3>
                {/* <p className="leading-none text-sm text-muted-foreground">
                  {url}
                </p> */}
                <p className="leading-none text-sm text-muted-foreground">
                  {loginEmail}
                </p>
              </div>
            </div>
            <Button
              onClick={() => onOpen("viewSavedPassword", { title, url, imgUrl: imgSrc, email: loginEmail, id: passId, createdAt, password })}
              variant={"ghost"}
              size={"icon"}
            >
              <ArrowUpRight className="size-6 text-muted-foreground/90" />
            </Button>
          </div>
        ) : (
          <div id="card" className="flex items-center justify-between">
            <div className="size-12 flex items-center justify-center rounded-md bg-muted-foreground/15">
              <img src={imgSrc} alt="site favicon" className="size-5" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold truncate w-[90%]">{url}</h3>
              <p className="leading-none text-sm text-muted-foreground">
                {loginEmail}
              </p>
            </div>
            <Button
              onClick={() => onOpen("viewSavedPassword", { title, url, imgUrl: imgSrc, email: loginEmail, id: passId, createdAt, password })}
              variant={"ghost"}
              size={"icon"}
            >
              <ArrowUpRight className="size-6 text-muted-foreground/90" />
            </Button>
          </div>
        )}
      </>
    );
  }
};

export default PasswordCard;
