import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts/umd/Recharts";
import { analyticsService } from "../service/getAnalytics";
// Mock Data for Weekly Activity Trend
const weeklyTrendData = [
  { day: "Mon", completions: 2 },
  { day: "Tue", completions: 4 },
  { day: "Wed", completions: 1 },
  { day: "Thu", completions: 3 },
  { day: "Fri", completions: 5 },
  { day: "Sat", completions: 2 },
  { day: "Sun", completions: 4 },
];

// Mock Data for Habit Category Breakdown
const categoryData = [
  { name: "Productivity", value: 40 },
  { name: "Fitness", value: 30 },
  { name: "Health", value: 20 },
  { name: "Mindset", value: 10 },
];

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#14b8a6"];

const ChartSection = ({ statistics }) => {
  return (
    <div className="grid mt-8">
      <div className="lg:col-span-2 bg-gray-900 border border-gray-800 p-6 rounded-2xl flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Activity Trend</h3>
            <p className="text-xs text-gray-500">
              Total habits completed per day this week
            </p>
          </div>
          <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
            This Week
          </span>
        </div>

        <div className="w-full h-64 mt-auto">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyTrendData}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorCompletions"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                stroke="#4b5563"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#4b5563"
                fontSize={12}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderColor: "#374151",
                  borderRadius: "12px",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="completions"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCompletions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
