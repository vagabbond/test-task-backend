import { Router } from "express";
import {
 fetchColumns,
 changeTaskOrder,
 deleteTask,
 moveTask,
 editTask,
 addTask,
} from "../controllers/column.controller";

export const columnsRouter = Router();

columnsRouter.get("/:boardId", fetchColumns);
columnsRouter.patch("/order/:id", changeTaskOrder);
columnsRouter.delete("/:columnId/task/:taskId", deleteTask);
columnsRouter.patch("/:newColumnId", moveTask);
columnsRouter.patch("/task/:taskId", editTask);
columnsRouter.post("/:columnId", addTask);
