import {config} from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes"
config()

import  "./database";

const app = express();
app.use(cors({
    origin: '*'
    }));
app.use(express.json());
app.use(router);


const PORT = process.env.PORT ?? 3000;

app.listen(PORT,()=> console.log(`App listening on port ${PORT}!`))