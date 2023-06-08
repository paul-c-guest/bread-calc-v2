import { ObjectId } from "mongodb";

export interface User {
  name: string,
  passHash: string,
  _id: ObjectId
}
