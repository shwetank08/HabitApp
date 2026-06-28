import Habit from "../model/habit.js";
import HabitLog from "../model/habitLog.js";
import mongoose from "mongoose";

export const getOverview = async (userId) => {
  const totalHabits = await Habit.countDocuments({ user: userId });
  const completedHabits = await HabitLog.countDocuments({
    user: userId,
    status: "COMPLETED",
  });
  const totalLogs = await HabitLog.countDocuments({ user: userId });
  return {
    totalHabits,
    totalCompletions: completedHabits,
    overallCompletionRate:
      totalLogs > 0 ? Math.round((completedHabits / totalLogs) * 100) : 0,
  };
};

export const getWeeklyTrend = async (userId) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);

  startDate.setHours(0, 0, 0, 0);

  const trendData = await HabitLog.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        date: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: { $dayOfWeek: "$date" },
        completions: {
          $sum: { $cond: [{ $eq: ["$status", "COMPLETED"] }, 1, 0] },
        },
      },
    },

    { $sort: { _id: 1 } },
  ]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const mongoDayMap = {
    1: "Sun",
    2: "Mon",
    3: "Tue",
    4: "Wed",
    5: "Thu",
    6: "Fri",
    7: "Sat",
  };

  const weeklyTrend = [
    { day: "Mon", completions: 0 },
    { day: "Tue", completions: 0 },
    { day: "Wed", completions: 0 },
    { day: "Thu", completions: 0 },
    { day: "Fri", completions: 0 },
    { day: "Sat", completions: 0 },
    { day: "Sun", completions: 0 },
  ];

  trendData.forEach((item) => {
    const day = mongoDayMap[item._id];

    const index = weeklyTrend.findIndex((d) => d.day === day);

    if (index !== -1) {
      weeklyTrend[index].completions = item.completions;
    }
  });
  return weeklyTrend;
};
export const getCompletionBreakdown = async (userId) => {
  const habitLogs = await HabitLog.aggregate([
    {
      $match: { user: new mongoose.Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: "$status",

        value: {
          $sum: 1,
        },
      },
    },
  ]);
};

export const getInsightData = async (userId) => {
  const habits = await Habit.find({
    user: new mongoose.Types.ObjectId(userId),
  });
  console.log("habits", habits);
  const bestHabit = habits.reduce((best, habit) => {
    const completionRate = habit.completionRate || 0;
    return completionRate > (best.completionRate || 0) ? habit : best;
  }, {});

  const worstHabit = habits.reduce((worst, habit) => {
    const completionRate = habit.completionRate || 0;
    return completionRate < (worst.completionRate || Infinity) ? habit : worst;
  }, {});

  const streakHabit = habits.reduce((best, habit) =>
    habit.currentStreak > best.currentStreak ? habit : best,
  );

  console.log("Best Habit:", bestHabit);
  console.log("Worst Habit:", worstHabit);
  console.log("Streak Habit:", streakHabit);

  return [
    {
      type: "success",
      title: "Best Performer",
      description: `${bestHabit.name} has the highest completion rate (${bestHabit.completionRate}%).`,
    },
    {
      type: "warning",
      title: "Needs Attention",
      description: `${worstHabit.name} has the lowest completion rate (${worstHabit.completionRate}%).`,
    },
    {
      type: "info",
      title: "Longest Streak",
      description: `${streakHabit.name} is on a ${streakHabit.currentStreak}-day streak.`,
    },
  ];
};
