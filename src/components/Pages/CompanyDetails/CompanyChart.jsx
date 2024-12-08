"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "../../ui/separator";

const chartConfig = {
  param: {
    label: "Показатель",
  },
  value: {
    label: "Значение",
    color: "hsl(var(--chart-1))",
  },
};

export function CompanyChart({ compId }) {
  const [paramId, setParamId] = React.useState("0");

  const { data, isPending } = useQuery({
    queryKey: ["reports", "full", compId],
    queryFn: async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "reports/lists",
        {
          params: { company_id: compId, full: true },
        }
      );
      return data;
    },
  });

  let chartData = [];

  data?.map((item) => {
    let chartItem = { date: item.created_at };
    chartItem.value = item.reports[paramId].param_value;
    chartData.push(chartItem);
  });

  return (
    <>
      {!isPending && data.length === 0 ? (
        <></>
      ) : (
        <>
        <Card>
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
              <CardTitle>График финансовых показателей</CardTitle>
              <CardDescription>
                Отображает финансовые показатели предприятия за всё время
              </CardDescription>
            </div>
            <Select value={paramId} onValueChange={setParamId}>
              <SelectTrigger
                className="w-64 rounded-lg sm:ml-auto bg-card shadow-sm font-medium"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="0" className="rounded-lg">
                  Внеоборотные активы
                </SelectItem>
                <SelectItem value="1" className="rounded-lg">
                  Основные средства
                </SelectItem>
                <SelectItem value="2" className="rounded-lg">
                  Незавершенное строительство
                </SelectItem>
                <SelectItem value="3" className="rounded-lg">
                  Долгосрочные финансовые вложения
                </SelectItem>
                <SelectItem value="4" className="rounded-lg">
                  Отложенные налоговые активы
                </SelectItem>
                <SelectItem value="5" className="rounded-lg">
                  Оборотные активы
                </SelectItem>
                <SelectItem value="6" className="rounded-lg">
                  Запасы
                </SelectItem>
                <SelectItem value="7" className="rounded-lg">
                  НДС
                </SelectItem>
                <SelectItem value="8" className="rounded-lg">
                  Дебиторская задолженность
                </SelectItem>
                <SelectItem value="9" className="rounded-lg">
                  Краткосрочные финансовые вложения
                </SelectItem>
                <SelectItem value="10" className="rounded-lg">
                  Денежные средства
                </SelectItem>
                <SelectItem value="11" className="rounded-lg">
                  Собственный капитал
                </SelectItem>
                <SelectItem value="12" className="rounded-lg">
                  Долгосрочные обязательства
                </SelectItem>
                <SelectItem value="13" className="rounded-lg">
                  Заемные средства
                </SelectItem>
                <SelectItem value="14" className="rounded-lg">
                  Кредиторская задолженность
                </SelectItem>
                <SelectItem value="15" className="rounded-lg">
                  Резервы предстоящих расходов
                </SelectItem>
                <SelectItem value="16" className="rounded-lg">
                  Коэффициент абсолютной ликвидности
                </SelectItem>
                <SelectItem value="17" className="rounded-lg">
                  Коэффициент быстрой (промежуточной) ликвидности
                </SelectItem>
                <SelectItem value="18" className="rounded-lg">
                  Коэффициент текущей (общей) ликвидности
                </SelectItem>
                <SelectItem value="19" className="rounded-lg">
                  Чистые оборотные активы (капитал)
                </SelectItem>
                <SelectItem value="20" className="rounded-lg">
                  Коэффициент капитализации
                </SelectItem>
                <SelectItem value="21" className="rounded-lg">
                  Коэффициент финансовой независимости
                </SelectItem>
                <SelectItem value="22" className="rounded-lg">
                  Коэффициент финансирования
                </SelectItem>
                <SelectItem value="23" className="rounded-lg">
                  Коэффициент финансовой устойчивости
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-value)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-value)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("ru-ru", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("ru-ru", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="value"
                  type="linear"
                  fill="url(#fillDesktop)"
                  stroke="var(--color-value)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Separator />
        </>
      )}
    </>
  );
}
