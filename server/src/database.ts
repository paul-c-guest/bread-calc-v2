import * as mongodb from "mongodb";
import { Flour } from "./flour";

const DB_NAME = 'floursDb'
const FLOURS_COLLECTION = 'commonFlours'

export const collections: { flours?: mongodb.Collection<Flour> } = {};

export async function connect(uri: string) {
  // get a mongo client
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  // get & validate the db for this project
  const db = client.db(DB_NAME);
  await validation(db);

  // get the collection in this db
  const floursCollection = db.collection<Flour>(FLOURS_COLLECTION);
  collections.flours = floursCollection;
}

async function validation(db: mongodb.Db) {
  const schema = {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name'],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "the name of the flour"
        },
        defaultHydration: {
          bsonType: "number",
          description: "an acceptable hydration percentage"
        }
      }
    }
  }

  await db.command({

    collMod: FLOURS_COLLECTION,
    validator: schema

  }).catch(async (error: mongodb.MongoServerError) => {

    if (error.codeName === 'NamespaceNotFound') {
      await db.createCollection(FLOURS_COLLECTION, { validator: schema });
    } else {
      console.log(`mongo server error: ${error.codeName}`);
    }

  });

}