import { model, Schema } from "mongoose";

export interface IBoard {
 columns: Schema.Types.ObjectId[];
 name: string;
}

const boardSchema = new Schema<IBoard>(
 {
  name: {
   type: String,
   required: true,
   unique: true,
  },
  columns: [
   {
    type: Schema.Types.ObjectId,
    ref: "Column",
   },
  ],
 },
 { timestamps: true }
);

export const Board = model<IBoard>("Board", boardSchema);
