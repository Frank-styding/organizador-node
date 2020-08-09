import { userItem } from "./userItem";
interface userType {
  name: string;
  password: string;
}
export class userCollection {
  next_id: number = 0;
  userMap = new Map<number, userItem>();
  constructor(userItems: userItem[] = []) {
    userItems.forEach((user) => this.userMap.set(user.id, user));
  }
  add(user: userType): number | undefined {
    let result: undefined | number = undefined;
    while (this.getUserById(this.next_id)) this.next_id++;
    if (!this.exits(user.name)) {
      this.userMap.set(
        this.next_id,
        new userItem(user.name, user.password, this.next_id)
      );
      result = this.next_id;
    }
    return result;
  }
  delete(user: userType) {
    let id = this.getUserByNameAndPassword(user);
    if (id) this.userMap.delete(id);
  }
  getUserByNameAndPassword(user: userType): number | undefined {
    let id: number | undefined;
    this.userMap.forEach((item) => {
      if (user.name == item.name && user.password == item.password)
        id = item.id;
    });
    return id;
  }
  getUserById(id: number): userItem | undefined {
    return this.userMap.get(id);
  }
  getSize(): number {
    return this.userMap.size;
  }
  getAll(): userItem[] {
    return [...this.userMap.values()];
  }
  getUserNames(): string[] {
    var result: string[] = [];
    this.userMap.forEach((userItem) => result.push(userItem.name));
    return result;
  }
  exits(name: string): boolean {
    let exits = false;
    this.userMap.forEach((user) => {
      if (user.name.toLowerCase().trim() == name.toLowerCase().trim())
        exits = true;
    });
    return exits;
  }
}
