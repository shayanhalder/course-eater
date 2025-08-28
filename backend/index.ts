import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import courseRouter from "./routes/course-endpoint";
import dbRouter from "./routes/db-endpoint";
import reqRouter from "./routes/req-endpoint";
import geRouter from "./routes/ge-endpoint";

const app = express();
const PORT = 8000;

/*
 * @todo Update corsOptions with appropriate origin, methods, and headers
 */

// Handle CORS
const corsOptions = {
  origin: "",
  methods: "",
  allowedHeaders: "",
  optionsSuccessStatus: 200,
};

// app.use(cors(corsOptions));
app.use(cors())

app.use(bodyParser.json());

app.use(courseRouter);
app.use(dbRouter)
app.use(reqRouter);
app.use(geRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
