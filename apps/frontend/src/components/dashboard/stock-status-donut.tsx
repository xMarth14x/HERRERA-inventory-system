"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import type { StockStatusSlice } from "@/lib/dashboard-data";

export function StockStatusDonut({ data }: { data: StockStatusSlice[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="gap-3 bg-gradient-to-br from-[#eef4ff] to-white">
      <CardHeader>
        <CardTitle className="text-lg text-[#0a43b8]">Stock Status</CardTitle>
      </CardHeader>
      <CardContent className="grid items-center gap-3 sm:grid-cols-[minmax(180px,1fr)_minmax(150px,0.8fr)]">
        <div className="relative h-[230px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius="56%" outerRadius="88%" stroke="white" strokeWidth={3}>
                {data.map((item) => <Cell key={item.name} fill={item.color} />)}
              </Pie>
              <Tooltip formatter={(value) => formatNumber(Number(value))} contentStyle={{ borderRadius: 10, borderColor: "#dfe5ef" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <strong className="text-2xl font-bold text-[#10172a]">{formatNumber(total)}</strong>
            <span className="text-xs text-muted-foreground">Total units</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-start gap-2.5">
              <span className="mt-1 size-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <div>
                <p className="text-sm text-[#33405d]">{item.name}</p>
                <p className="font-semibold tabular-nums">{formatNumber(item.value)} ({Math.round((item.value / total) * 100)}%)</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/reports" className="flex items-center gap-1 text-sm font-semibold text-[#0a43b8] hover:underline">
          View full report <ArrowRight className="size-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
