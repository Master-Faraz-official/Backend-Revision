import express from "express"
import { readFile } from 'fs/promises';

// Reading local data 
const data = JSON.parse(await readFile(new URL('./MOCK_DATA.json', import.meta.url), 'utf8'));

const app = express()

// Middleware
// app.use(express.urlencoded({ extended: false }))
app.use((req,res,next)=>{})

// This will list all the users 
app.get("/api/users", (req, res) => {
    res.send(data)
})


// :id -> dynamic id 
app.get("/api/users/:id", (req, res) => {
    // Getting the dynamic id 
    const id = Number(req.params.id);

    // Finding users based on id
    const user = data.find((user) => user.id === id)
    res.send(user)
})

// Merging all the requests 
app.route("/api/users/:id")
    .get((req, res) => {
        //  Getting the dynamic id 
        const id = Number(req.params.id);

        // Finding users based on id
        const user = data.find((user) => user.id === id)
        return res.send(user)
    })
    .post((req, res) => {
        const body = req.body;
        console.log(body) 
        return res.json(body)
    })
    .patch((req, res) => {
        return res.json({ status: "Pending" })
    })
    .delete((req, res) => {
        return res.json({ status: "Pending" })
    })

app.listen(8000, () => {
    console.log("Server started")
})