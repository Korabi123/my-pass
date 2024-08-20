"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const TopSection = () => {
  const currentUser = useUser();

  return (
    <div className="w-full h-[50vh] bg-purple-500">
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
          <BreadcrumbList>
            <BreadcrumbItem className="text-white hover:text-muted-foreground transition">
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white" />
            <BreadcrumbItem className="text-white hover:text-muted-foreground transition">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
          <UserButton />
        </div>
      </header>
      <h1 className="text-white text-4xl pt-20 max-w-screen-lg mx-auto lg:px-0 px-10 font-bold">
        Welcome back, {currentUser?.user?.firstName}!
      </h1>
    </div>
  );
}

export default TopSection;
