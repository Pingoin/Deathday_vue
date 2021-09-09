import Loki from "lokijs";
import { User } from "@/classes/User";

const exampleUser: User = {
  name: "Pingoin",
  birthDate: Date.parse("1990-03-07 21:00"),
  sex: "m"
}

const dbVersion = "1";
export class UserStore {
  private db: Loki;

  constructor() {
    this.db = new Loki("deathday.json", {
      env: "BROWSER",
      autoload: true,
      autoloadCallback: this.databaseInitialize.bind(this),
      autosave: true,
      autosaveInterval: 4000
    });
  }
  private dbUsers: Collection<User> | null = null;
  private databaseInitialize() {
    if (this.db.name === undefined) {
      this.db.removeCollection("Users");
      this.db.removeCollection("dbinfo");
      this.db.name = dbVersion;
    } else if (this.db.name !== dbVersion) {
      console.log(`update DB from ${this.db.name} to ${dbVersion}`);
      switch (this.db.name) {
        case "0":
          this.db.name = "1";
          this.db.save();
        default:
          break;
      }
    }
    this.dbUsers = this.db.getCollection<User>("Users");
    if (this.dbUsers === null) {
      this.initUser();
    }
  }

  initUser() {
    this.dbUsers = this.db.addCollection<User>("Users", { unique: ["name"] });
    this.dbUsers.insertOne(exampleUser);
  }

  get users(): User[] {
    if (this.dbUsers === null) {
      return [];
    } else {
      return this.dbUsers.find();
    }
  }

  addUser(newUser: User): "inserted" | "updated" {
    const tmpUser = this.getUser(newUser.name)
    if (tmpUser) {
      this.dbUsers?.update(newUser);
      return "updated";
    } else {
      this.dbUsers?.insertOne(newUser);
      return "inserted";
    }
  }

  getUser(name: string): User | undefined {
    const user = this.dbUsers?.by("name", name);
    return user;
  }
  getUserDef(name: string): User {
    const user = this.dbUsers?.by("name", name);
    return user ? user : exampleUser;
  }

  removeUser(user:User):void{
    this.dbUsers?.remove(user);
  }
}


export const store = new UserStore();