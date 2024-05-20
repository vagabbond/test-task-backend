import { Router } from "express";
import {
 createBoard,
 fetchBordByName,
 editBoardName,
 deleteBoard,
} from "../controllers/board.controller";
export const boardRouter = Router();

boardRouter.post("/", createBoard);
boardRouter.get("/:name", fetchBordByName);
boardRouter.patch("/:id", editBoardName);
boardRouter.delete("/:id", deleteBoard);
