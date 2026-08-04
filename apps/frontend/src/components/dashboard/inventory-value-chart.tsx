"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactCurrency, formatNumber } from "@/lib/format";
import type { LocationInventoryValue } from "@/lib/dashboard-data";

// Sequential blue ramp, mid step — a single series needs one hue, not a scale.
const BAR_FILL = "#2a78d6";
const GRID_STROKE = "#e1e0d9";
const AXIS_STROKE = "#898781";

export function InventoryValueChart({ data }: { data: LocationInventoryValue[] }) {
  const sorted = [...data].sort((a, b) => b.value - a.value);

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Inventory Value by Location</CardTitle>
      </CardHeader>
      <CardContent className="pr-6">
        <div style={{ width: "100%", height: sorted.length * 44 + 24 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sorted}
              layout="vertical"
              margin={{ top: 4, right: 48, bottom: 4, left: 4 }}
              barCategoryGap={12}
            >
              <CartesianGrid horizontal={false} stroke={GRID_STROKE} />
              <XAxis
                type="number"
                tickFormatter={(v) => formatCompactCurrency(v)}
                stroke={AXIS_STROKE}
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: GRID_STROKE }}
              />
              <YAxis
                type="category"
                dataKey="location"
                width={130}
                stroke={AXIS_STROKE}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(42, 120, 214, 0.06)" }}
                formatter={(value) => [`$${formatNumber(Number(value))}`, "Inventory value"]}
                contentStyle={{ borderRadius: 8, borderColor: GRID_STROKE, fontSize: 12 }}
              />
              <Bar dataKey="value" fill={BAR_FILL} radius={[0, 4, 4, 0]} maxBarSize={24}>
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(v) => formatCompactCurrency(Number(v))}
                  style={{ fill: "#52514e", fontSize: 12 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
