import express from "express";
import mongoose from "mongoose";
import { Task } from "./models/Task.js";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 5555;

app.use(cors());
app.use(express.json());

// ------ 데이터 호출-------------------
app.get("/items", async (req, res) => {
  try {
    const sort = req.query.sort;
    const keyword = req.query.keyword;
    const count = req.query.count;

    let task;

    const sortOption = {
      createdAt: sort === "recent" ? -1 : 1,
    };

    if (keyword) {
      task = await Task.find({
        $or: [
          { name: { $regex: keyword } },
          { description: { $regex: keyword } },
        ],
      }).sort(sortOption);
    } else {
      task = await Task.find().sort(sortOption);
    }

    res.json(task);
  } catch (e) {
    console.log(e);
    res.status(500).send("DB ERROR");
  }
});

// ------ 데이터 생성------------------
app.post("/items", async (req, res) => {
  try {
    const data = req.body;

    const task = await Task.create(data);

    res.status(201).json(task);
  } catch (e) {
    console.log(e);
    res.status(400).send("error");
  }
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));

app.listen(process.env.PORT, () => {
  console.log(`Sever Started ${PORT}`);
});
