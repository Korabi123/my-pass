import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import PasswordCard from "./password-card";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { PasswordType } from "@/app/PasswordType";
import OpenModalButton from "../open-modal-button";
import { Plus } from "lucide-react";

const PasswordsInfoCard = async () => {
  const user = await currentUser();

  const passwordsByUser = await axios.get<PasswordType[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}`);

  return (
    <div className="w-full">
      <div className="max-w-screen-lg mx-auto -mt-[20vh] flex md:flex-row flex-col gap-3 lg:px-0 px-10 py-4 flex-grow">
        <Card className="w-full shadow-md p-6">
          <div className="w-full flex items-center justify-between">
            <CardTitle>All Passwords for <span>{user?.firstName}</span></CardTitle>
            {/* @ts-ignore */}
            <OpenModalButton icon={<Plus className="size-6 text-muted-foreground/90" />} type={"createPassword"}>
              <Plus className="size-6 text-muted-foreground/90" />
            </OpenModalButton>
          </div>
          <CardContent className="mt-8 p-2 h-[300px] overflow-y-scroll">
            <div className="flex flex-col gap-4">
            {passwordsByUser.data.length > 0 ? (
                <>
                  {passwordsByUser.data.map((password: PasswordType) => (
                  <PasswordCard
                    imgSrc={`https://s2.googleusercontent.com/s2/favicons?domain=${password.url}`}
                    loginEmail={password.email}
                    passId={password.id}
                    title={password.title}
                    url={password.url}
                    password={password.password}
                    key={password.id}
                    createdAt={password.createdAt}
                    createdAtMonth={password.createdAtMonth}
                    isBig
                  />
                ))}
                </>
              ) : (
                <PasswordCard
                  isBig
                  noPassword
                  imgSrc="l"
                  loginEmail="l"
                  passId="l"
                  title="l"
                  url="l"
                  password="l"
                  createdAt="l"
                  createdAtMonth="l"
                />
              )}

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PasswordsInfoCard;
