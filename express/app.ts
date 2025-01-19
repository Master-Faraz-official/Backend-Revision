import express from "express"
import { Request, Response } from "express";

const app = express();


app.get("/", (req : Request, res:Response) => {
     res.send("hello world")
})

app.get("/signup", (req : Request, res:Response) => {
     res.send("This is signup page " + req.query.name + " " + req.query.age 
     )
})

app.listen(8000, () => {
    console.log(`Server is running on http://localhost:8000`);
  });