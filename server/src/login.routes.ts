import * as express from "express";
import * as mongodb from "mongodb";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "./model/user";
import { timestamp } from "rxjs";
import { time } from "console";

export const loginRouter = express.Router();
loginRouter.use(express.json());

// test supplied password against user, on success return a jsonwebtoken
loginRouter.post("/", async (req, res) => {

  const { name, password } = req.body;

  const client = new mongodb.MongoClient(process.env.MONGODB_URI);
  client.connect();

  const user: User = await client.db().collection<User>("users").findOne({ name: name });

  if (!user) {
    return res.status(400).send("no user found");
  }

  const passwordValid = await bcrypt.compare(password, user.passHash);

  if (!passwordValid) {
    return res.status(401).send("incorrect password");
  }

  const token = jwt.sign(
    { name: user.name, id: user._id },
    process.env.SECRET_SQUIRREL,
    { expiresIn: "1h" }
  )

  res.status(200).send({
    token,
    name: user.name
  });

})

loginRouter.get("/", (req, res) => {
  const { token, name } = req.body;

  try {

    const payload = jwt.verify(token, process.env.SECRET_SQUIRREL) as jwt.JwtPayload;

    if (payload.name == name && tokenValid(payload.exp)) {
      res.status(200).send(true);
    } else {
      res.status(401).send(false);
    }

  } catch (error) {

    // console.log(error.name);

    switch (error.name) {
     
      case jwt.TokenExpiredError.name:
        console.log("token expired");
        return res.status(401).send(false);

      case jwt.JsonWebTokenError.name:
        console.log("token error");
        return res.status(400).send(false);

    }
  }
})

function tokenValid(expiryEpochSeconds: number): boolean {

  const timeNow: number = Math.floor(Date.now() / 1000);
  const errorMargin: number = 60; // allow a fuzzy margin of a minute

  return expiryEpochSeconds > timeNow + errorMargin;

}