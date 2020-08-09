import { animeCollection } from "../anime/animeCollection";
import { categoryCollection } from "../category/categoryCollection";
export class userItem {
  categoryCollection: categoryCollection = new categoryCollection();
  animeCollection: animeCollection = new animeCollection();
  constructor(
    public name: string,
    public password: string,
    public id: number
  ) {}
}
