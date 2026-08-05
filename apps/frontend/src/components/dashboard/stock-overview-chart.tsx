"use client";

import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import type { StockTrendPoint } from "@/lib/dashboard-data";

const SERIES = [
  { key: "inStock", label: "In stock", color: "#0a43b8" },
  { key: "lowStock", label: "Low stock", color: "#ffca0a" },
  { key: "outOfStock", label: "Out of stock", color: "#ed1b2f" },
] as const;

export function StockOverviewChart({ data }: { data: StockTrendPoint[] }) {
  return (
    <Card className="gap-3 bg-gradient-to-br from-[#eef4ff] to-white">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <CardTitle className="text-lg text-[#0a43b8]">Stock Overview</CardTitle>
        <div className="flex flex-wrap justify-end gap-4">
          {SERIES.map((series) => (
            <span key={series.key} className="flex items-center gap-1.5 text-xs font-medium text-[#33405d]">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: series.color }} />
              {series.label}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[285px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 12, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="inStockFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a43b8" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#0a43b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e4e9f1" vertical={false} />
              <XAxis dataKey="month" axisLine={{ stroke: "#dfe5ef" }} tickLine={false} tick={{ fill: "#65708a", fontSize: 12 }} />
              <YAxis tickFormatter={(value) => `${Number(value) / 1000}K`} axisLine={false} tickLine={false} tick={{ fill: "#65708a", fontSize: 12 }} width={38} />
              <Tooltip
                formatter={(value, name) => [formatNumber(Number(value)), SERIES.find((series) => series.key === name)?.label ?? String(name)]}
                contentStyle={{ borderRadius: 10, borderColor: "#dfe5ef", boxShadow: "0 8px 24px rgba(22,44,84,.12)" }}
              />
              <Area
                type="monotone"
                dataKey="inStock"
                stroke="none"
                fill="url(#inStockFill)"
                isAnimationActive={false}
                legendType="none"
              />
              {SERIES.map((series) => (
                <Line
                  key={series.key}
                  type="monotone"
                  dataKey={series.key}
                  stroke={series.color}
                  strokeWidth={2.75}
                  dot={{ r: 4.5, fill: series.color, strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
