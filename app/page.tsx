import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
        <p className="">You are signed in as: {user?.fullName}</p>
      </SignedIn>
      <SignedOut>
        <Link href={"/sign-up"}>
          <Button className="group" variant={"link"}>Sign Up <ArrowRightIcon className="ml-2 group-hover:ml-4 transition-all" /></Button>
        </Link>
      </SignedOut>
    </>
  );
}
