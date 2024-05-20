import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { boardRouter } from "./routes/boards.routes";
import { connect } from "./config/db";
import { columnsRouter } from "./routes/columns.routes";

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();
const corsOptions = {
 origin: true,
 credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/boards", boardRouter);
app.use("/api/columns", columnsRouter);

app.listen(PORT, async () => {
 await connect();
 console.log(`Server is started on port ${PORT}`);
});
