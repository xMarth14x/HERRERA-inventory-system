"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import { LOCATIONS, availableQuantity } from "@/lib/location-data";

// Sequential blue ramp, mid step — a single series (Available quantity)
// compared across locations needs one hue, not a scale.
const BAR_FILL = "#2a78d6";
const GRID_STROKE = "#e1e0d9";
const AXIS_STROKE = "#898781";

export function AvailableByLocationChart() {
  const data = [...LOCATIONS]
    .map((l) => ({ location: l.location, available: availableQuantity(l) }))
    .sort((a, b) => b.available - a.available);

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Available Stock by Location</CardTitle>
      </CardHeader>
      <CardContent className="pr-6">
        <div style={{ width: "100%", height: data.length * 40 + 24 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 48, bottom: 4, left: 4 }}
              barCategoryGap={12}
            >
              <CartesianGrid horizontal={false} stroke={GRID_STROKE} />
              <XAxis
                type="number"
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
                formatter={(value) => [formatNumber(Number(value)), "Available"]}
                contentStyle={{ borderRadius: 8, borderColor: GRID_STROKE, fontSize: 12 }}
              />
              <Bar dataKey="available" fill={BAR_FILL} radius={[0, 4, 4, 0]} maxBarSize={24}>
                <LabelList
                  dataKey="available"
                  position="right"
                  formatter={(v) => formatNumber(Number(v))}
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
