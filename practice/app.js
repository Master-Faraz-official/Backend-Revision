import express from 'express';
import router from './routes/test.route.js';

const app = express();

// Common Middleware for all routes
app.use((req, res, next) => {
    console.log("Common Middleware for all routes");
    next();
})

// Routes
app.use("/", router);



app.listen(8000, (req, res) => {
    console.log("Server running ")
})