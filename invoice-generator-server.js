import path from 'path';
const __dirname = path.resolve();
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import connectDB from './app/database.js';
import apiRoutes from './app/routes/index.js';


connectDB();

const app = express();
const port = process.env.PORT || 9000;

// json parser to send response in json format
app.use(bodyParser.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());


//
// routes
//

app.use("/api/v1/", apiRoutes);

app.get('/', async(req, res) => {
    res.status(200);
    res.send("Invoice Generator Server is running.");
});

const server = app.listen(port, (error) => {
    if (!error)
        console.log("Invoice Generator Server is running successfully on ", port);
    else
        console.log("Error occurred, Invoice Generator Server unable start", error);
});
