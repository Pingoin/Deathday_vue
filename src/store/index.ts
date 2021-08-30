import Loki from "lokijs";
import { User } from "@/classes/User";

const exampleUser: User = {
  name: "Pingoin",
  birthDate: new Date(Date.parse("1990-03-07 21:00")),
  sex: "m"
}

export class UserStore {
  private db: Loki;

  constructor() {
    this.db = new Loki("deathday.json", {
      env:"BROWSER",
      autoload: true,
      autoloadCallback: this.databaseInitialize.bind(this),
      autosave: true,
      autosaveInterval: 4000
    });
  }

  private dbUsers: Collection<User> | null = null;
  private databaseInitialize() {
    this.dbUsers = this.db.getCollection<User>("Users");
    if (this.dbUsers === null) {
      console.log("Bla")
      this.initUser();
    }else{
      console.log("Sackratte")
    }
  }
  
  initUser(){
    this.dbUsers = this.db.addCollection<User>("Users", {});
    this.dbUsers.insertOne(exampleUser);
  }

  get users(): User[] {
    if (this.dbUsers === null) {
      return [];
    } else {
      return this.dbUsers.find();
    }
  }

  get user() {
    return (id: undefined | string): User =>{
      if (this.dbUsers === null) {
        return exampleUser;
      } else {
        return exampleUser;
      }
    }
  }
}


export const store = new UserStore();