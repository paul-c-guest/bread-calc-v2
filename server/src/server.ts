import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connect } from "./database";
import { flourRouter } from "./flour.routes";
import { userRouter } from "./user.routes";
import { loginRouter } from "./login.routes";
import { fallback } from './middleware'

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

    app.use(express.static('src/static'));
    app.use(cors());
    app.use("/api/flours", flourRouter);
    app.use("/api/users", userRouter);
    app.use("/api/login", loginRouter);
    app.use(fallback);

    app.listen(PORT, () => console.log(`server running on port ${PORT}...`));

  }).catch(error => console.error(error));
