import { Component, OnInit } from "@angular/core";
import {
  NavController,
  LoadingController,
  ToastController
} from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { User } from "../../app/app.models";
import { Observable } from "rxjs";
import { ChatService } from "../../app/app.service";
import { Storage } from "@ionic/storage";
import { ChatsPage } from "../chats/chats";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  email: string;
  constructor(
    public navCtrl: NavController,
    private db: AngularFirestore,
    private chatservice: ChatService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {}

  ngOnInit() {
    /* let users = this.db
      .collection<User>("users", ref => {
        return ref.where('email', '==', 'fik4christ@yahoo.com')
      })
      .valueChanges()
      .subscribe(users => {
        console.log(users);
      }); */
    //Adding a User
    /* let user = this.chatservice
      .addUser("test@fikky.com")
      .then(res => console.log(res))
      .catch(err => console.log(err)); */
  }

  loginUser() {
    if (this.email != "") {
      //Check if email already exists

      this.db
        .collection<User>("users", ref => {
          return ref.where("email", "==", this.email);
        })
        .valueChanges()
        .subscribe(users => {
          console.log(users);

          if (users.length === 0) {
            //Register User
            let myLoader = this.loadingCtrl.create({
              content: "Please wait..."
            });
            myLoader.present().then(() => {
              this.chatservice
                .addUser(this.email)
                .then(res => {
                  //Registration successful, go to chats page
                  this.storage.set("chatuser", this.email);
                  myLoader.dismiss();

                  let toast = this.toastCtrl.create({
                    message: "Login In Successful",
                    duration: 3000,
                    position: "top"
                  });
                  toast.present();

                  this.navCtrl.push(ChatsPage);
                })
                .catch(err => {
                  console.log(err);
                  myLoader.dismiss();
                });
            });
          } else {
            //User already exists, move to chats page
            this.storage.set("chatuser", this.email);

            let toast = this.toastCtrl.create({
              message: "Login In Successful",
              duration: 3000,
              position: "top"
            });
            toast.present();

            this.navCtrl.push(ChatsPage);
          }
        });
    } else {
      let toast = this.toastCtrl.create({
        message: "Enter Email to log in",
        duration: 3000,
        position: "top"
      });
      toast.present();
    }
  }
}
