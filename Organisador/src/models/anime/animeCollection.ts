import { animeItem } from "./animeItem";
import { categoryCollection } from "../category/categoryCollection";
export class animeCollection {
  nextId: number = 0;
  animeMap = new Map<number, animeItem>();
  add(name: string, decription: string = "") {
    let result: number | undefined = undefined;
    while (this.getAnimeById(this.nextId)) this.nextId++;
    if (!this.exits(name)) {
      this.animeMap.set(
        this.nextId,
        new animeItem(name, this.nextId, decription)
      );
      result = this.nextId;
    }
    return result;
  }
  delete(name: string) {
    let id = this.getAnimeByName(name);
    if (id) this.animeMap.delete(id);
  }
  getAnimeById(id: number): animeItem | undefined {
    return this.animeMap.get(id);
  }
  getAnimeByName(name: string): number | undefined {
    let id: number | undefined;
    this.animeMap.forEach((anime) => {
      if (anime.name.toLowerCase().trim() === name.toLowerCase().trim())
        id = anime.id;
    });
    return id;
  }
  exits(name: string): boolean {
    let exits = false;
    this.animeMap.forEach((anime) => {
      if (
        anime.name.toLowerCase().trim().toLowerCase().trim() ==
        name.toLowerCase().trim()
      )
        exits = true;
    });
    return exits;
  }
  getAll(): animeItem[] {
    return [...this.animeMap.values()];
  }
  getNames(): string[] {
    let result: string[] = [];
    this.animeMap.forEach((anime) => {
      result.push(anime.name);
    });
    return result;
  }
  getSize(): number {
    return this.animeMap.size;
  }
}
