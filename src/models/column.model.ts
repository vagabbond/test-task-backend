import { model, Schema } from "mongoose";

export interface ITask {
 [x: string]: any;
 title: string;
 caption: string;
}

export interface IColumn {
 title: string;
 tasks: ITask[];
 board: Schema.Types.ObjectId;
}
export const taskSchema = new Schema<ITask>(
 {
  title: { type: String, required: true },
  caption: { type: String, required: true },
 },
 { _id: true }
);
const columnSchema = new Schema<IColumn>({
 title: { type: String, required: true },
 tasks: [taskSchema],
 board: {
  type: Schema.Types.ObjectId,
  ref: "Board",
 },
});

export const Column = model<IColumn>("Column", columnSchema);
