import { userCollection } from "./userCollection";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { type } from "os";
import { jsonToUserCollection, userCollectionToJson } from "../conberter";

type users = {
  users: {
    id: number;
    name: string;
    password: string;
    animeCollection: {
      id: number;
      name: string;
      description: string;
      categoryCollection: {
        id: number;
        name: string;
      }[];
      imageCollection: {
        id: number;
        src: string;
      }[];
      seasons: number[];
    }[];
    categoryCollection: {
      id: number;
      name: string;
    }[];
  }[];
};
export class JsonUserCollection extends userCollection {
  private db: lowdb.LowdbSync<users>;
  constructor() {
    super();
    this.db = lowdb(new FileSync("db.json"));
    this.db.defaults({ users: [] }).write();
    if (this.db.has("users").value()) {
      let dbItems = jsonToUserCollection(this.db.get("users").value()).getAll();
      dbItems.forEach((item) => {
        this.userMap.set(item.id, item);
      });
    }
  }
  addUser(name: string, password: string) {
    super.add({ name, password });
    this.storeUsers();
  }
  storeUsers() {
    let jsonUser = userCollectionToJson(this);
    this.db.set("users", jsonUser.users).write();
  }
}
