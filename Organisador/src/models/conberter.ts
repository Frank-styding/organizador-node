import { userCollection } from "./user/userCollection";
import { userItem } from "./user/userItem";
import { animeItem } from "./anime/animeItem";
interface anime {
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
}

interface user {
  id: number;
  name: string;
  password: string;
  animeCollection: anime[];
  categoryCollection: {
    id: number;
    name: string;
  }[];
}

interface users {
  users: user[];
}
export function jsonToUserCollection(db: user[]): userCollection {
  var users = new userCollection();
  db.forEach((item) => {
    var _user = new userItem(item.name, item.password, item.id);
    item.animeCollection.forEach((item2) => {
      let anime = new animeItem(item2.name, item2.id, item2.description);
      item2.categoryCollection.forEach((item3) =>
        anime.categoryCollection.categoryMap.set(item3.id, item3)
      );
      item2.imageCollection.forEach((item3) =>
        anime.imageCollection.imageMap.set(item3.id, item3)
      );
      anime.seasons = item2.seasons;
      _user.animeCollection.animeMap.set(item2.id, anime);
    });
    item.categoryCollection.forEach((item2) =>
      _user.categoryCollection.categoryMap.set(item2.id, item2)
    );

    users.userMap.set(_user.id, _user);
  });
  return users;
}
export function userCollectionToJson(user: userCollection) {
  let db: users = { users: [] };
  user.getAll().forEach((item) => {
    let _user: user = {
      id: item.id,
      name: item.name,
      password: item.password,
      categoryCollection: [],
      animeCollection: [],
    };
    item.categoryCollection.categoryMap.forEach((item2) =>
      _user.categoryCollection.push(item2)
    );
    item.animeCollection.getAll().forEach((item2) => {
      let anime: anime = {
        id: item2.id,
        name: item2.name,
        description: item2.description,
        seasons: item2.seasons,
        categoryCollection: [],
        imageCollection: [],
      };
      item2.categoryCollection.categoryMap.forEach((item3) =>
        anime.categoryCollection.push(item3)
      );
      item2.imageCollection
        .getAll()
        .forEach((item3) => anime.imageCollection.push(item3));
      _user.animeCollection.push(anime);
    });
    db.users.push(_user);
  });
  return db;
}
