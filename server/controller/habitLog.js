import HabitLog from "../model/habitLog.js";

export const upsertHabitLog = async (req, res) => {
  try {
    const { date, status, value, note } = req.body;
    const userId = req.user.id;
    const habitId = req.query

    const normalizeDate = new Date(date); // to prevent multiple entries for the same day due to time differences
    normalizeDate.setUTCHours(0, 0, 0, 0); // UTC timezone for consistency

    const updatedData = {
      habit: habitId,
      user: userId,
      date: normalizeDate,
      status: status || "COMPLETED",
      value: value || null,
      note: note || "",
    };

    if (updatedData.status === "COMPLETED") {
      updatedData.completedAt = new Date();
    } else {
      updatedData.completedAt = null;
    }

    const log = await HabitLog.findOneAndUpdate(
      { habit: habitId, user: userId, date: normalizeDate },
      updatedData,
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    res.status(200).json({
      success: true,
      data: log,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in upserting habit log",
      details: error.message,
    });
  }
};

export const getHabitLogsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const userId = req.user.id;
    const normalizeDate = new Date(date);
    normalizeDate.setUTCHours(0, 0, 0, 0);
    const logs = await HabitLog.find({
      user: userId,
      date: normalizeDate,
    }).populate("habit");
    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in fetching habit logs",
      details: error.message,
    });
  }
};

export const getHabitLogsByHabitId = async (req, res) => {
  try {
    const { habitId } = req.params;
    const userId = req.user.id;
    const logs = await HabitLog.find({
      user: userId,
      habit: habitId,
    });
    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in fetching habit logs",
      details: error.message,
    });
  }
};

export const streaksRange = async (req, res) => {
    try {
        const {startDate, endDate} = req.query;
        const userId = req.user.id;
        const logs = await HabitLog.find({
            user: userId,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            },
        }).sort({ date: 1 });
        res.status(200).json({
            success: true,
            data: logs
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Error in fetching habit logs for streaks",
            details: error.message
        });
    }
  }