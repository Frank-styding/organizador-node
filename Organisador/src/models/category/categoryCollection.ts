import { categoryItem } from "./categoryItem";
export class categoryCollection {
  next_id: number = 0;
  categoryMap = new Map<number, categoryItem>();
  constructor() {}
  add(name: string): number | undefined {
    let result: number | undefined = undefined;
    while (this.getById(this.next_id)) this.next_id++;
    if (!this.exits(name)) {
      this.categoryMap.set(this.next_id, new categoryItem(this.next_id, name));
      result = this.next_id;
    }
    return result;
  }
  delete(name: string) {
    let id = this.getByName(name);
    if (id) this.categoryMap.delete(id);
  }
  getByName(name: string): number | undefined {
    let id: number | undefined;
    this.categoryMap.forEach((category) => {
      if (category.name.toLowerCase().trim() == name.toLowerCase().trim())
        id = category.id;
    });
    return id;
  }
  exits(name: string): boolean {
    let exits: boolean = false;
    this.categoryMap.forEach((category) => {
      if (category.name.toLowerCase().trim() == name.toLowerCase().trim()) {
        exits = true;
      }
    });
    return exits;
  }
  getById(id: number): categoryItem | undefined {
    return this.categoryMap.get(id);
  }
  getNames(): string[] {
    var result: string[] = [];
    this.categoryMap.forEach((categoryItem) => result.push(categoryItem.name));
    return result;
  }
  getSize(): number {
    return this.categoryMap.size;
  }
}
