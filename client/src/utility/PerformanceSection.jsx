import React from "react";
import { TrendingUp, AlertTriangle, Zap } from "lucide-react";

// Mock Data for individual habits
const habitsAnalyticsData = [
  { name: "Drink Water", type: "Daily", current: "12 Days", max: "30 Days", rate: 96, label: "🔥" },
  { name: "Do System Design", type: "Weekly (3x)", current: "4 Weeks", max: "6 Weeks", rate: 80, label: "⚡" },
  { name: "Gym Workout", type: "Weekly (4x)", current: "0 Weeks", max: "12 Weeks", rate: 50, label: "⚡" },
  { name: "Health Screening", type: "Monthly (1x)", current: "3 Months", max: "3 Months", rate: 100, label: "🌙" },
];

const PerformanceSection = () => {
  return (
    <div className="mt-8 space-y-8">
      
      {/* Behavioral Insights Cards Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Behavioral Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Insight 1: Positive Trend */}
          <div className="flex gap-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 h-fit">
              <TrendingUp size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Best Routine Day</h4>
              <p className="text-xs text-gray-400 mt-1">
                You are 30% more likely to complete <span className="text-emerald-400 font-medium">Do System Design</span> on Tuesdays than on Fridays.
              </p>
            </div>
          </div>

          {/* Insight 2: Warning/Attention Needed */}
          <div className="flex gap-4 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 h-fit">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Weekend Dip</h4>
              <p className="text-xs text-gray-400 mt-1">
                Your consistency drops by an average of 15% on weekends. Try setting a Saturday reminder pattern.
              </p>
            </div>
          </div>

          {/* Insight 3: Consistency Streak Bonus */}
          <div className="flex gap-4 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 h-fit">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Global Velocity</h4>
              <p className="text-xs text-gray-400 mt-1">
                Boom! You have kept your monthly health and screen benchmarks running solid for <span className="text-indigo-400 font-medium">3 months straight</span>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PerformanceSection;