"use client";

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import PasswordCard from "../password-card";
import { useUser } from "@clerk/nextjs";

const PasswordsInfoCard = () => {
  const currentUser = useUser();

  return (
    <div className="w-full">
      <div className="max-w-screen-lg mx-auto -mt-[20vh] flex md:flex-row flex-col gap-3 lg:px-0 px-10 py-4 flex-grow">
        <Card className="w-full shadow-md p-6">
          <CardTitle>All Passwords for <span>{currentUser?.user?.firstName}</span></CardTitle>
          <CardContent className="mt-8 p-2 h-[300px] overflow-y-scroll">
            <div className="flex flex-col gap-4">
              <PasswordCard
                imgSrc="https://s2.googleusercontent.com/s2/favicons?domain=google.com"
                loginEmail="john.doe@gmail.com"
                passId="1234567890"
                title="Google Account"
                url="https://google.com"
                isBig
              />
              <PasswordCard
                imgSrc="https://s2.googleusercontent.com/s2/favicons?domain=netflix.com"
                loginEmail="john.doe@gmail.com"
                passId="1234567890"
                title="Netflix Account"
                url="https://netflix.com"
                isBig
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PasswordsInfoCard;
