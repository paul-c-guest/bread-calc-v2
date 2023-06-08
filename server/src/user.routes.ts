import * as express from "express";
import * as mongodb from "mongodb";
import * as auth from "./user.auth";
import { User } from "./model/user";

export const userRouter = express.Router();
userRouter.use(express.json());

const USERS = "users";

userRouter.get("/", async (req, res) => {

})

userRouter.post("/", async (req, res) => {

  // check if request body is valid
  const { name, password } = req.body;
  if (!name) {
    return res.status(400).send("User object missing name");
  } else if (!password) {
    return res.status(400).send("User object missing password hash");
  }

  // TODO validate strength of PW (or do this on frontend)

  // make one-off mongo connection 
  const client = new mongodb.MongoClient(process.env.MONGODB_URI);
  await client.connect();

  // check server-side for existing username, add if unique
  const userNameInUse = await client.db().collection<User>(USERS).findOne({ name: name });

  if (userNameInUse) {
    return res.status(403).send(`username ${req.body.name} already in use`);
  }

  const newUser = {
    name: req.body.name,
    passHash: await auth.hash(password)
  };

  client.db().collection<User>(USERS)
    .insertOne(newUser as User)
    .then(result => res.status(201).send(`added user id ${result.insertedId}`));

})

userRouter.put("/:id", async (req, res) => {
  // update user if correct target

  // send approriate response

})

userRouter.delete("/", async (req, res) => {
  // make one-off mongo connection 
  const client = new mongodb.MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const result = await client.db().collection(USERS).deleteOne(req.body);

  result.deletedCount
    ? res.status(200).send(`user ${req.body.name} deleted`)
    : res.status(400).send(`user ${req.body.name} not found`);

})
