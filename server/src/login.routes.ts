import * as express from "express";
import * as mongodb from "mongodb";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "./model/user";

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

  // TODO success, create and return token 

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