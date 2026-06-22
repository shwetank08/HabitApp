import React from "react";

const AnalyticsProgress = ({ habits }) => {
  // console.log("habits from analytics", habits);

  const formatFrequency = (habit) => {
    if (habit.frequency === "DAILY") {
      return "Daily";
    }

    if (habit.frequency === "WEEKLY") {
      return `Weekly (${habit.days?.length || 0}x)`;
    }

    if (habit.frequency === "MONTHLY") {
      return "Monthly";
    }

    return habit.frequency;
  };

  const habitsAnalyticsData = habits.map((habit) => ({
    name: habit.name,
    type: formatFrequency(habit),
    current: habit.currentStreak,
    max: habit.maxStreak,
    rate:
      habit.maxStreak > 0
        ? Math.round((habit.currentStreak / habit.maxStreak) * 100)
        : 0,
    label:
      habit.currentStreak >= 30
        ? "🏆"
        : habit.currentStreak >= 14
          ? "🔥"
          : habit.currentStreak >= 7
            ? "⚡"
            : "🌱",
  }));

  const getProgressColor = (rate) => {
    if (rate >= 80) return "bg-emerald-500";
    if (rate >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  // console.log("habitsAnalyticsData", habitsAnalyticsData);
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-8">
      <h3 className="text-xl font-bold text-white mb-4">
        Habit Consistency Breakdown
      </h3>

      <div className="space-y-4">
        <p className="text-[10px] text-gray-500 mt-1">
          Current streak compared to your best streak
        </p>
        {habitsAnalyticsData.map((habit, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-800/40 border border-gray-800 rounded-xl gap-4"
          >
            {/* Habit Name & Type */}
            <div className="w-48">
              <h4 className="font-semibold text-white">{habit.name}</h4>
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full mt-1 inline-block">
                {habit.type}
              </span>
            </div>

            {/* Streaks */}
            <div className="flex gap-8 text-sm">
              <div className="w-28">
                <p className="text-gray-500 text-xs">Current Streak</p>
                <p className="text-white font-medium mt-0.5">
                  {habit.label} {habit.current}
                </p>
              </div>
              <div className="w-28">
                <p className="text-gray-500 text-xs">Max Streak</p>
                <p className="text-gray-400 font-medium mt-0.5">
                  {habit.label} {habit.max}
                </p>
              </div>
            </div>

            {/* Completion Progress Bar */}
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Streak Strength</span>
                <span className="text-indigo-400 font-medium">
                  {habit.rate==5?0:habit.rate}%
                </span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${getProgressColor(habit.rate)} h-full rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${habit.rate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsProgress;
