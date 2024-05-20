import { Request, Response } from "express";
import { Board } from "../models/board.model";
import { Column } from "../models/column.model";

export const fetchColumns = async (req: Request, res: Response) => {
 try {
  const { boardId } = req.params;
  const board = await Board.findById(boardId).populate("columns");
  if (!board) {
   return res.status(404).json({ message: "Board not found" });
  }
  res.send(board.columns);
 } catch (error) {
  res.status(500).send(error);
 }
};
export const changeTaskOrder = async (req: Request, res: Response) => {
 try {
  const { id } = req.params;
  const { taskId, insertAtIndex } = req.body;
  const column = await Column.findById(id);
  if (!column) {
   return res.status(404).json({ message: "Column not found" });
  }
  const previousIndex = column.tasks.findIndex(
   (task) => task._id.toString() === taskId
  );
  if (previousIndex === -1) {
   return res.status(404).json({ message: "Task not found in the column" });
  }
  const [task] = column.tasks.splice(previousIndex, 1);
  const newIndex =
   insertAtIndex === -1
    ? column.tasks.length
    : Math.min(insertAtIndex, column.tasks.length);
  column.tasks.splice(newIndex, 0, task);
  await column.save();
  return res.json(column.tasks);
 } catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Server error" });
 }
};

export const deleteTask = async (req: Request, res: Response) => {
 try {
  const { taskId, columnId } = req.params;
  console.log("taskId", taskId, "columnId", columnId);
  console.log("deleteTask");
  const column = await Column.findById(columnId);
  if (!column) {
   return res.status(404).json({ message: "Column not found" });
  }
  const taskIndex = column.tasks.findIndex(
   (task) => task._id.toString() === taskId
  );
  if (taskIndex === -1) {
   return res.status(404).json({ message: "Task not found in the column" });
  }
  column.tasks.splice(taskIndex, 1);
  await column.save();
  return res.json({ taskId });
 } catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Server error" });
 }
};

export const moveTask = async (req: Request, res: Response) => {
 try {
  const { taskId, fromColumnId, insertAtIndex } = req.body;
  const { newColumnId } = req.params;
  const fromColumn = await Column.findById(fromColumnId);
  const toColumn = await Column.findById(newColumnId);

  if (!fromColumn || !toColumn) {
   return res.status(404).json({ message: "Column not found" });
  }

  const taskIndex = fromColumn.tasks.findIndex(
   (task) => task._id.toString() === taskId
  );
  if (taskIndex === -1) {
   return res.status(404).json({ message: "Task not found in the column" });
  }

  const [task] = fromColumn.tasks.splice(taskIndex, 1);

  const newIndex =
   insertAtIndex === -1
    ? toColumn.tasks.length
    : Math.min(insertAtIndex, toColumn.tasks.length);

  toColumn.tasks.splice(newIndex, 0, task);

  await fromColumn.save();
  await toColumn.save();
  return res.json({ task, newColumnId, fromColumnId });
 } catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Server error" });
 }
};

export const editTask = async (req: Request, res: Response) => {
 try {
  const { taskId } = req.params;
  const { caption, columnId, title } = req.body;
  const column = await Column.findById(columnId);
  if (!column) {
   return res.status(404).json({ message: "Column not found" });
  }
  const task = column.tasks.find((task) => task._id.toString() === taskId);
  if (!task) {
   return res.status(404).json({ message: "Task not found in the column" });
  }
  task.title = title;
  task.caption = caption;
  await column.save();
  return res.json({ taskId, columnId, title, caption });
 } catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Server error" });
 }
};

export const addTask = async (req: Request, res: Response) => {
 try {
  const { title, caption } = req.body;
  const { columnId } = req.params;
  const column = await Column.findById(columnId);
  if (!column) {
   return res.status(404).json({ message: "Column not found" });
  }
  const task = {
   title,
   caption,
  };
  column.tasks.push(task);
  const result = await column.save();
  const createdTask = result.tasks[result.tasks.length - 1];
  return res.json(createdTask);
 } catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Server error" });
 }
};
