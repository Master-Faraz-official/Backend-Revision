const express = require("express")
const app = express()
const port = 4000

app.get("/", (req, res) => {
    res.send("This is the revision part")
})

app.get("/test", (req, res) => {
    res.send("This is the test part")
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)

}) 