import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const flourRouter = express.Router();
flourRouter.use(express.json());

// return all flours in collection as array
flourRouter.get("/", async (_request, response) => {
  try {
    const flours = await collections.flours.find({}).toArray();
    response
      .status(200)
      .send(flours);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send(error.message);
  }
});

// get flour by mongo id
flourRouter.get("/:id", async (request, response) => {
  try {
    const id = request?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const flour = await collections.flours.findOne(query);
    if (flour) {
      response.status(200).send(flour);
    } else {
      response.status(404).send(`no flour at id ${id}`);
    }
  } catch (error) {
    response.status(404).send(`error retrieving id from ${request?.params?.id}`);
  }
});

// add new flour
flourRouter.post("/", async (request, response) => {
  try {
    const flour = request.body;
    // console.log(flour);
    const result = await collections.flours.insertOne(flour);

    if (result.acknowledged) {
      response.status(201).send(`added new flour ${result.insertedId}`);
    } else {
      response.status(500).send(`did not add new flour`);
    }
  } catch (error) {
    console.error(error);
    response.status(400).send(error.message);
  }
});

// update existing flour
flourRouter.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const filter = { _id: new mongodb.ObjectId(id) };
    const update = { $set: request.body };

    const result = await collections.flours.updateOne(filter, update);

    if (result && result.matchedCount) {
      response.status(200).send(`updated flour ${id}`);
    } else if (!result.matchedCount) {
      response.status(404).send(`didn't find flour ${id}`);
    } else {
      response.status(304).send(`didn't update flour ${id}`);
    }

  } catch (error) {
    console.error(error.message);
    response.status(400).send(error.message);
  }
});

// delete a flour
flourRouter.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const filter = { _id: new mongodb.ObjectId(id) };
    const result = await collections.flours.deleteOne(filter);

    if (!result) {
      response.status(400).send(`didn't delete flour ${id}`);
    } else if (result.deletedCount) {
      response.status(202).send(`deleted flour ${id}`);
    } else {
      response.status(404).send(`didn't find flour ${id}`);
    }

  } catch (error) {
    console.error(error.message);
    response.status(400).send(error.message);
  }
});

// remove ALL flours from db
flourRouter.delete("/", async (request, response) => {

});