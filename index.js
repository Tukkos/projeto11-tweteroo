import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.post("/sign-up", (req, res) =>{
    
})

app.get("/", (req, res) => {
    res.send();
});

app.listen(5000, () => console.log("Listen on 5000"))

// http://localhost:4000/