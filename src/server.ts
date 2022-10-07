// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const router = require('./routes');
// require('./database');

// const app = express();
// app.use(express.json());
// app.use(router);
// app.use(cors());

// const PORT = process.env.PORT ?? 3000;

// app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}!`);
// })
import {config} from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes"
config()

import  "./database";

const app = express();
 app.use(express.json());
 app.use(router);
 app.use(cors());

 const PORT = process.env.PORT ?? 3000;

app.listen(PORT,()=> console.log(`App listening on port ${PORT}!`))