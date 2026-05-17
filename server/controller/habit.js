import Habit from "../model/habit.js";
import HabitLog from "../model/habitLog.js";
import User from "../model/user.js";
import calculateStreaks from "../utils/calculateStreaks.js";

export const createHabit = async (req, res) => {
  try {
    const { name, description, frequency } = req.body;
    console.log(req.user);

    const user = await User.findById(req.user.id);
    console.log("inside create habit", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const habit = await Habit.create({
      user: user.id,
      name,
      description,
      frequency,
      days: req.body.days || [],
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHabits = async (req, res) => {
  try {
    const currentHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!currentHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json(currentHabit);
  } catch (err) {
    res
      .status(500)
      .json({ message: "error in updating habits", details: err.message });
  }
};

export const deleteHabits = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in deleting habits", details: error.message });
  }
};

export const getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json(habit);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in fetching habit", details: error.message });
  }
};
export const getAllHabit = async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await Habit.find({ user: userId });
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const frontendData = await Promise.all(
      habits.map(async (habit) => {
        const logs = await HabitLog.find({
          habit: habit._id,
          user: userId,
          status: "COMPLETED",
        }).sort({ date: 1 });

        const streakData = calculateStreaks(logs, habit.frequency);
        console.log("streak data", streakData);

        const todayLog = await HabitLog.findOne({
          habit: habit._id,
          user: userId,
          date: today,
          status: "COMPLETED",
        });

        return {
          ...habit.toObject(),
          completedToday: !!todayLog,
          currentStreak: streakData.currentStreak,
          maxStreak: streakData.maxStreak,
        };
      }),
    );
    res.status(200).json(frontendData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in fetching habit", details: error.message });
  }
};
