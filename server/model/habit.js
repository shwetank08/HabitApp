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
    days:{
      type: [String],
      default: [],
      validate: {
        validator: function(value) {
          if (this.frequency === FrequencyType.WEEKLY) {
            return value.length > 0;
          }
          return true;
        },
        message: "Days are required for weekly habits"
      }
    }
  },
  { timestamps: true },
);
export default mongoose.model("Habit", habitSchema);
