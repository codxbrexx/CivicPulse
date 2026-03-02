import mongoose, { Document } from "mongoose";

export interface IIssue extends Document {
  title: string;
  description: string;
  category: string;
  status: "open" | "in-progress" | "resolved";
  severity: "low" | "medium" | "high";
  priorityScore: number;
  reportCount: number;
  reportedBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  society: mongoose.Types.ObjectId;
  slaDeadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

const issueSchema = new mongoose.Schema<IIssue>(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    category: {
      type: String,
      enum: ["plumbing", "electricity", "lift", "security", "cleanliness", "water"],
      required: true
    },

    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open"
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    },

    priorityScore: {
      type: Number,
      default: 0
    },

    reportCount: {
      type: Number,
      default: 1
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    society: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society",
      required: true
    },

    slaDeadline: {
      type: Date
    }
  },
  { timestamps: true }
);

export const Issue = mongoose.model<IIssue>("Issue", issueSchema);