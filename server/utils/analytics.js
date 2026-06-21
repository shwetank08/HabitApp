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

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return trendData.map((item) => ({
    day: daysOfWeek[item._id - 1],
    completions: item.completions,
  }));
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
