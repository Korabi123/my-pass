import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { currentMonth } from "@/lib/currentMonth";
import PasswordCard from "../passwords/password-card";
import PasswordsChart from "./passwords-chart";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";
import { PasswordType } from "@/app/PasswordType";

const InfoSection = async () => {
  const user = await currentUser();

  const passwordsByUser = await axios.get<PasswordType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}`
  );

  const passwordsByJanuary = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=January`
  );
  const passwordsByFebruary = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=Febuary`
  );
  const passwordsByMarch = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=March`
  );
  const passwordsByApril = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=April`
  );
  const passwordsByMay = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=May`
  );
  const passwordsByJune = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=June`
  );
  const passwordsByJuly = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=July`
  );
  const passwordsByAugust = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=August`
  );
  const passwordsBySeptember = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=September`
  );
  const passwordsByOctober = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=October`
  );
  const passwordsByNovember = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=November`
  );
  const passwordsByDecember = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwords/get?userId=${user?.id}&createdAtMonth=December`
  );

  let chartData: any[] = [];

  const cMonth = currentMonth();

  const half1 =
    cMonth === "January" ||
    cMonth === "Febuary" ||
    cMonth === "March" ||
    cMonth === "April" ||
    cMonth === "May" ||
    cMonth === "June";

  // console.log(`Passwords in january: ${passwordsByJanuary.data.length}`);
  // console.log(`Passwords in february: ${passwordsByFebruary.data.length}`);
  // console.log(`Passwords in march: ${passwordsByMarch.data.length}`);
  // console.log(`Passwords in april: ${passwordsByApril.data.length}`);
  // console.log(`Passwords in may: ${passwordsByMay.data.length}`);
  // console.log(`Passwords in june: ${passwordsByJune.data.length}`);
  // console.log(`Passwords in july: ${passwordsByJuly.data.length}`);
  // console.log(`Passwords in august: ${passwordsByAugust.data.length}`);
  // console.log(`Passwords in september: ${passwordsBySeptember.data.length}`);
  // console.log(`Passwords in october: ${passwordsByOctober.data.length}`);
  // console.log(`Passwords in november: ${passwordsByNovember.data.length}`);
  // console.log(`Passwords in december: ${passwordsByDecember.data.length}`);

  // console.log(`Current userId: ${user?.id}`);

  const chartConfig = {
    createdPasswords: {
      label: "Passwords",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  half1
    ? (chartData = [
        { month: "January", createdPasswords: passwordsByJanuary.data.length },
        { month: "January", createdPasswords: passwordsByJanuary.data.length },
        {
          month: "February",
          createdPasswords: passwordsByFebruary.data.length,
        },
        { month: "March", createdPasswords: passwordsByMarch.data.length },
        { month: "April", createdPasswords: passwordsByApril.data.length },
        { month: "May", createdPasswords: passwordsByMay.data.length },
        { month: "June", createdPasswords: passwordsByJune.data.length },
      ])
    : (chartData = [
        { month: "July", createdPasswords: passwordsByJuly.data.length },
        { month: "July", createdPasswords: passwordsByJuly.data.length },
        { month: "August", createdPasswords: passwordsByAugust.data.length },
        {
          month: "September",
          createdPasswords: passwordsBySeptember.data.length,
        },
        { month: "October", createdPasswords: passwordsByOctober.data.length },
        {
          month: "November",
          createdPasswords: passwordsByNovember.data.length,
        },
        {
          month: "December",
          createdPasswords: passwordsByDecember.data.length,
        },
      ]);

  return (
    <div className="w-full">
      <div className="max-w-screen-lg mx-auto md:-mt-[20vh] -mt-[10vh] flex md:flex-row flex-col gap-3 lg:px-0 px-10 py-4 flex-grow">
        <Card className="md:w-[65%] w-full shadow-md p-6">
          <CardTitle>Passwords Created</CardTitle>
          <CardContent className="mt-4">
            <PasswordsChart chartConfig={chartConfig} chartData={chartData} />
          </CardContent>
        </Card>
        <Card className="md:w-[35%] w-full shadow-md p-6">
          <CardTitle>Recently Created Passwords</CardTitle>
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
                    />
                  ))}
                </>
              ) : (
                <PasswordCard
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
};

export default InfoSection;
