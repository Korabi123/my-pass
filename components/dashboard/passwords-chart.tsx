"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PasswordsChartProps {
  chartData: any[];
  chartConfig: ChartConfig;
}

const PasswordsChart = ({ chartData, chartConfig }: PasswordsChartProps) => {
  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width={"100%"} height={100}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey={"createdPasswords"}
            type={"natural"}
            fill="red"
            fillOpacity={0.4}
            stroke="red"
            strokeOpacity={0.6}
            stackId={"a"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default PasswordsChart;
