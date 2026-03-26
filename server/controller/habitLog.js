import HabitLog from "../model/habitLog.js";

export const upsertHabitLog = async (req, res) => {
  try {
    const { date, status, value, note } = req.body;
    const userId = req.user.id;
    const {habitid} = req.params

    const normalizeDate = new Date(date); // to prevent multiple entries for the same day due to time differences
    normalizeDate.setUTCHours(0, 0, 0, 0); // UTC timezone for consistency

    const updatedData = {
      habit: habitid,
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
      { habit: habitid, user: userId, date: normalizeDate },
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
    const { habitid } = req.params;
    const userId = req.user.id;
    const logs = await HabitLog.find({
      user: userId,
      habit: habitid,
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

        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "startDate and endDate query parameters are required in YYYY-MM-DD format"
            });
        }

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if(isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Please use YYYY-MM-DD."
            });
        }

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