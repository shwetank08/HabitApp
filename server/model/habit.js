import mongoose from "mongoose";
import FrequencyType from "../utils/frequencyType.js";

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    frequency: {
      type: String,
      enum: Object.values(FrequencyType),
      default: FrequencyType.DAILY,
      required: true,
    },
    days: {
      type: [String],
      enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      default: [],
    },
  },
  { timestamps: true },
);

habitSchema.pre("validate", async function () {
  if (this.frequency === FrequencyType.WEEKLY) {
    if (!this.days || this.days.length === 0) {
      throw new Error("Days are required for weekly habits");
    }
  }

  if (this.frequency !== FrequencyType.WEEKLY) {
    this.days = [];
  }
});

export default mongoose.model("Habit", habitSchema);
