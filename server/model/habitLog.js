import mongoose from "mongoose";

const habitLogSchema = new mongoose.Schema(
  {
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["COMPLETED", "MISSED", "SKIPPED"],
      default: "COMPLETED",
    },
    value: {
      type: Number,
      default: null
    },
    note: {
      type: String,
      trim: true,
      default: ""
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true },
);

habitLogSchema.index({ habit: 1, user: 1, date: 1}, { unique: true });
habitLogSchema.index({ user: 1, date: -1 });


export default mongoose.model("HabitLog", habitLogSchema);
