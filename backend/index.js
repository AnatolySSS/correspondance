import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import setConnection from "./config/db-connection.js";
import router from "./routes/router.js";
import bodyParser from "body-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirname = __dirname.replace("backend", "frontend")

app.use(bodyParser.json({limit: "150mb"}));
app.use(bodyParser.urlencoded({limit: "150mb", extended: true, parameterLimit:150000}));
app.use(express.static(path.join(dirname, 'build')));
app.use('/', router)

app.get('/*', (request, responce) => {
  responce.sendFile(path.join(dirname, 'build', 'index.html'));
});

const { PORT } = setConnection()
app.listen(PORT, () => {
  console.log(`Server is starting on PORT ${PORT}`);
});
