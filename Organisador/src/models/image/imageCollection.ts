import { imageItem } from "./imageItem";
export class imageCollection {
  nextid: number = 0;
  imageMap = new Map<number, imageItem>();
  constructor(imageItems: imageItem[] = []) {
    imageItems.forEach((image) => this.imageMap.set(image.id, image));
  }
  add(src: string): number {
    while (this.getImageById(this.nextid)) this.nextid++;
    this.imageMap.set(this.nextid, new imageItem(this.nextid, src));
    return this.nextid;
  }
  delete(id: number) {
    this.imageMap.delete(id);
  }
  getImageById(id: number): imageItem | undefined {
    return this.imageMap.get(id);
  }
  getSize(): number {
    return this.imageMap.size;
  }
  getAll(): imageItem[] {
    return [...this.imageMap.values()];
  }
}
