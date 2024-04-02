import express from 'express';
import Connection from './database/db.js';
import Route from './routes/route.js';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));

app.use('/',Route);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.resolve(__dirname,  'frontend', 'build');
console.log("frontendPath", frontendPath);
app.use(express.static(frontendPath));

Connection();
app.get("/", (req, res) => {
    // app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(frontendPath, "index.html"));
    });
const PORT = 8000;

app.listen(PORT , () => console.log(`Server is running successfully on PORT ${PORT}`));




