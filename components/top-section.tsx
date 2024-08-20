"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const TopSection = ({ style }: { style?: "isGreeting" | "isCurrentPage" }) => {
  const pathname = usePathname();
  const currentUser = useUser();

  return (
    <div className="w-full h-[50vh] bg-purple-500 dark:bg-purple-600">
      <header className="flex max-w-screen-lg mx-auto lg:px-0 px-10 py-4 items-center justify-between">
        <Link href="/">
          <Image
            src={"/branding/logo-white-256x256.png"}
            alt="MyPass Logo"
            width={40}
            height={40}
          />
        </Link>
        <div className="flex items-center gap-10">
          <Breadcrumb className="text-white">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  slot="dashboard"
                  className="text-white hover:text-white/70 transition"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white" />
              <BreadcrumbItem>
                {pathname === "/dashboard" ? (
                  <BreadcrumbLink
                    slot="homeSection"
                    className="text-white hover:text-white/70 transition"
                  >
                    Home
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink
                    slot="homeSection"
                    className="text-white hover:text-white/70 transition"
                  >
                    Passwords
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <UserButton />
        </div>
      </header>
      {pathname === "/dashboard" ? (
        <h1 className="text-white font-calistoga self-end text-3xl md:text-4xl lg:text-5xl pt-20 max-w-screen-lg mx-auto lg:px-0 px-10">
          Welcome back, {currentUser?.user?.firstName}{" "}
          <img
            src="/waving-hand.png"
            alt="waving hand"
            className="size-9 lg:size-11 ml-2 -mt-1 inline-block"
          />
        </h1>
      ) : (
        <h1 className="text-white font-calistoga self-end text-3xl md:text-4xl lg:text-5xl pt-20 max-w-screen-lg mx-auto lg:px-0 px-10">
          {pathname === "/dashboard" ? "Dashboard" : "Passwords"}
        </h1>
      )}
    </div>
  );
};

export default TopSection;
