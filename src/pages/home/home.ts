import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { User } from "../../app/app.models";
import { Observable } from "rxjs";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  constructor(public navCtrl: NavController, private db: AngularFirestore) {}

  ngOnInit() {
    let users = this.db
      .collection<User>("users")
      .valueChanges()
      .subscribe(users => {
        console.log(users);
      });
  }
}
