import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connect } from "./database";
import { flourRouter } from "./flour.routes";

// init dotenv stuff so 'process' knows about it
dotenv.config();

const { MONGODB_URI, PORT } = process.env;

if (!MONGODB_URI) {
  console.error('mongo db uri not defined or not found in config.env');
  process.exit(1);
}

connect(MONGODB_URI)
  .then(() => {

    const app = express();

    app.use(cors());
    app.use("/flours", flourRouter);
    app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}...`));

  }).catch(error => console.error(error));
