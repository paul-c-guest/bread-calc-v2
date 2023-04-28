import { ObjectId } from "mongodb"; 

export interface Flour {
  name: string;
  defaultHydration: number;
  _id?: ObjectId;
}