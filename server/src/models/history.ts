import { Model, model, models, Schema, Types } from "mongoose"; // 👈 remove ObjectId, add Types

export type historyType = {
  _id?: Types.ObjectId; // 👈 add this
  audio: Types.ObjectId; // 👈
  progress: number;
  date: Date;
};

interface HistoryDocument {
  _id: Types.ObjectId; // 👈 add this
  owner: Types.ObjectId; // 👈
  last: historyType;
  all: historyType[];
}

const historySchema = new Schema<HistoryDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    last: {
      audio: { type: Schema.Types.ObjectId, ref: "Audio" },
      progress: Number,
      date: { type: Date, required: true },
    },
    all: [
      {
        audio: { type: Schema.Types.ObjectId, ref: "Audio" },
        progress: Number,
        date: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

const History = models.History || model("History", historySchema);
export default History as Model<HistoryDocument>;