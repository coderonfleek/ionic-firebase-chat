import { Injectable } from "@angular/core";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { User, Chat } from "./app.models";
import { appconfig } from "./app.config";

@Injectable()
export class TaskService {
  users: AngularFirestoreCollection<User>;
  private userDoc: AngularFirestoreDocument<User>;

  chats: AngularFirestoreCollection<Chat>;
  private chatDoc: AngularFirestoreDocument<Chat>;

  constructor(private db: AngularFirestore) {
    //Get the tasks collecction
    this.users = db.collection<User>(appconfig.users_endpoint);
    this.users = db.collection<User>(appconfig.users_endpoint);
  }

  addUser(email) {
    //First check if the user already exists
    this.db.collection<User>(appconfig.users_endpoint, ref => {
      return ref.where("email", "==", email);
    });

    //if
    //Add the new task to the collection
    //this.tasks.add(task);
  } //addTask

  /* updateTask(id, update) {
    //Get the task document
    this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);

    this.taskDoc.update(update);
  } //updateTask

  deleteTask(id) {
    //Get the task document
    this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);

    //Delete the document
    this.taskDoc.delete();
  } //deleteTask */
}
