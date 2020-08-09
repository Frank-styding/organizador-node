import { JsonUserCollection } from "../models/user/jsonUserCollection";
import inquirer from "inquirer";
import { homedir, type } from "os";
export class consoleInterface {
  user_selected = { name: "", password: "" };
  user_selected_id = 0;
  user_new = { name: "", password: "" };
  intentsCount = 0;
  constructor(public db: JsonUserCollection) {
    this.Home();
  }
  Home() {
    console.clear();
    inquirer
      .prompt({
        type: "list",
        name: "Command",
        message: "Select a option",
        choices: ["Login", "Register", "Exit"],
      })
      .then((result) => {
        if (result.Command == "Exit") process.exit();
        if (result.Command == "Login") this.Login();
        if (result.Command == "Register") this.Register();
      });
  }
  //loguin--complete
  Login(message = "") {
    console.clear();
    if (message != "") console.log(message);
    var userList = this.db.getUserNames();
    inquirer
      .prompt({
        type: "list",
        message: "Select your user name",
        name: "userName",
        choices: [...userList, "Go back"],
      })
      .then((result) => {
        if (result.userName != "Go back") {
          this.user_selected.name = result.userName;
          this.LoginInputPassword();
        } else {
          this.Home();
        }
      });
  }
  LoginInputPassword(message = "") {
    if (message != "") console.log(message);
    inquirer
      .prompt({
        type: "input",
        name: "password",
        message: "Please write your password",
      })
      .then((result) => {
        this.user_selected.password = result.password;
        var id = this.db.getUserByNameAndPassword(this.user_selected);
        if (this.intentsCount < 5) {
          if (id == undefined) {
            console.clear();
            this.intentsCount++;
            this.LoginInputPassword(
              "the password is incorrect -- intents " + this.intentsCount
            );
          } else {
            this.user_selected_id = id;
            this.UserOptions();
          }
        } else {
          this.intentsCount = 0;
          this.Home();
        }
      });
  }
  //reguitser--conplete
  Register() {
    console.clear();
    inquirer
      .prompt({
        type: "list",
        name: "Command",
        choices: ["continue", "Go back"],
      })
      .then((result) => {
        if (result.Command == "continue") this.RegisterInputName();
        if (result.Command == "Go back") this.Home();
      });
  }
  RegisterInputName(message = "") {
    console.clear();
    if (message != "") console.log(message);
    inquirer
      .prompt({
        type: "input",
        name: "userName",
        message: "please write username",
      })
      .then((result) => {
        this.user_new.name = result.userName;
        this.RegisterInputPassword();
      });
  }
  RegisterInputPassword() {
    inquirer
      .prompt({
        type: "input",
        name: "password",
        message: "please write your password",
      })
      .then((result) => {
        this.user_new.password = result.password;
        var id = this.db.add(this.user_new);
        if (id == undefined) {
          this.RegisterInputName("the user already exits");
        } else {
          this.db.storeUsers();
          this.Home();
        }
      });
  }
  UserOptions() {
    console.clear();
    console.log("user : " + this.user_selected.name);
    inquirer
      .prompt({
        type: "list",
        name: "option",
        message: "selecte a option",
        choices: ["animes", "categories", "count", "close section"],
      })
      .then((result) => {
        if (result.option == "close section") {
          this.user_selected.name = "";
          this.user_selected.password = "";
          this.user_selected_id = 0;
          this.Home();
        }
        if (result.option == "animes") this.OptionAnimes();
      });
  }
  OptionAnimes() {
    inquirer
      .prompt({
        type: "list",
        name: "option",
        message: "selec a option",
        choices: ["add anime", "delete anime", "edit anime", "go back"],
      })
      .then((result) => {
        if (result.option == "go back") this.UserOptions();
      });
  }
}
