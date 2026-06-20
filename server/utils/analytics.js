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

    activeHabits: totalHabits,

    totalCompletions: completedHabits,

    overallCompletionRate:
      totalLogs > 0 ? Math.round((completedHabits / totalLogs) * 100) : 0,
  };
};

export const getWeeklyTrend = async (userId) => {};

export const getCompletionBreakdown = async (userId) => {};

export const getInsights = async (userId) => {};
