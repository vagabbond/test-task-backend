import { Request, Response } from "express";
import { Board } from "../models/board.model";
import { Column } from "../models/column.model";

export const fetchBordByName = async (req: Request, res: Response) => {
 try {
  const { name } = req.params;
  console.log(req.params);
  const board = await Board.findOne({
   name,
  });
  if (!board) {
   return res.status(404).json({ message: "Board not found" });
  }
  return res.json(board);
 } catch (error) {
  return res.status(500).json({ message: "Server error" });
 }
};

export const createBoard = async (req: Request, res: Response) => {
 try {
  const { name } = req.body;
  const columns = [
   {
    title: "To Do",
    tasks: [],
   },
   {
    title: "In Progress",
    tasks: [],
   },
   {
    title: "Done",
    tasks: [],
   },
  ];
  const column = await Column.insertMany(columns);
  const board = new Board({
   name,
   columns: column.map((c) => c._id),
  });
  await board.save();
  return res.json(board);
 } catch (error) {
  return res.status(500).json({ message: error });
 }
};

export const editBoardName = async (req: Request, res: Response) => {
 try {
  const { id } = req.params;
  const { name } = req.body;
  const board = await Board.findByIdAndUpdate(id, { name }, { new: true });
  if (!board) {
   return res.status(404).json({ message: "Board not found" });
  }
  return res.json(board);
 } catch (error) {
  return res.status(500).json({ message: "Server error" });
 }
};

export const deleteBoard = async (req: Request, res: Response) => {
 try {
  const { id } = req.params;
  const board = await Board.findByIdAndDelete(id);
  if (!board) {
   return res.status(404).json({ message: "Board not found" });
  }
  await Column.deleteMany({ _id: { $in: board.columns } });
  return res.json({ id });
 } catch (error) {
  return res.status(500).json({ message: "Server error" });
 }
};
