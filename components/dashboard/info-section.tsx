import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { currentMonth } from "@/lib/currentMonth";
import PasswordCard from "../password-card";
import PasswordsChart from "./passwords-chart";

const InfoSection = () => {
  let chartData: any[] = [];

  const cMonth = currentMonth();

  const half1 =
    cMonth === "January" ||
    cMonth === "Febuary" ||
    cMonth === "March" ||
    cMonth === "April" ||
    cMonth === "May" ||
    cMonth === "June";
  const half2 =
    cMonth === "July" ||
    cMonth === "August" ||
    cMonth === "September" ||
    cMonth === "October" ||
    cMonth === "November" ||
    cMonth === "December";

  const chartConfig = {
    createdPasswords: {
      label: "Passwords",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  half1
    ? (chartData = [
        { month: "January", createdPasswords: 133 },
        { month: "January", createdPasswords: 133 },
        { month: "Febuary", createdPasswords: 99 },
        { month: "March", createdPasswords: 247 },
        { month: "April", createdPasswords: 70 },
        { month: "May", createdPasswords: 53 },
        { month: "June", createdPasswords: 327 },
      ])
    : (chartData = [
        { month: "July", createdPasswords: 700 },
        { month: "July", createdPasswords: 700 },
        { month: "August", createdPasswords: 330 },
        { month: "September", createdPasswords: 475 },
        { month: "October", createdPasswords: 812 },
        { month: "November", createdPasswords: 544 },
        { month: "December", createdPasswords: 220 },
      ]);

  return (
    <div className="w-full">
      <div className="max-w-screen-lg mx-auto md:-mt-[20vh] -mt-[10vh] flex md:flex-row flex-col gap-3 lg:px-0 px-10 py-4 flex-grow">
        <Card className="md:w-[65%] w-full shadow-md p-6">
          <CardTitle>Passwords Created</CardTitle>
          <CardContent>
            <PasswordsChart chartConfig={chartConfig} chartData={chartData} />
          </CardContent>
        </Card>
        <Card className="md:w-[35%] w-full shadow-md p-6">
          <CardTitle>Recently Added Passwords</CardTitle>
          <CardContent className="mt-8 p-2 h-[300px] overflow-y-scroll">
            <div className="flex flex-col gap-4">
              <PasswordCard
                imgSrc="https://s2.googleusercontent.com/s2/favicons?domain=google.com"
                loginEmail="john.doe@gmail.com"
                passId="1234567890"
                title="Google Account"
                url="https://google.com"
              />
              <PasswordCard
                imgSrc="https://s2.googleusercontent.com/s2/favicons?domain=netflix.com"
                loginEmail="john.doe@gmail.com"
                passId="1234567890"
                title="Netflix Account"
                url="https://netflix.com"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfoSection;
