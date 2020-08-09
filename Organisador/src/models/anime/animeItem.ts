import { imageCollection } from "../image/imageCollection";
import { categoryCollection } from "../category/categoryCollection";
export class animeItem {
  categoryCollection = new categoryCollection();
  imageCollection = new imageCollection();
  seasons: number[] = [];
  constructor(
    public name: string,
    public id: number = 0,
    public description: string = ""
  ) {}
}
