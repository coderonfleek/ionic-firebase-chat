import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Chat } from "../../app/app.models";
import { appconfig } from "../../app/app.config";
import { ChatService } from "../../app/app.service";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-chatroom",
  templateUrl: "chatroom.html"
})
export class ChatroomPage implements OnInit {
  chats: any = [];
  chatpartner = this.chatService.currentChatPartner;
  chatuser;
  message: string;
  chatPayload: Chat;
  intervalScroll;
  @ViewChild("content") content: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private chatService: ChatService,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatroomPage");
  }

  //scrolls to bottom whenever the page has loaded
  ionViewDidEnter() {
    this.content.scrollToBottom(300); //300ms animation speed
  }

  ionViewWillLeave() {}

  /* ionViewWillEnter(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  } */

  ngOnInit() {
    console.log(this.chatService.currentChatPairId);

    this.storage.get("chatuser").then(chatuser => {
      this.chatuser = chatuser;
    });

    this.db
      .collection<Chat>(appconfig.chats_endpoint, res => {
        return res.where("pair", "==", this.chatService.currentChatPairId);
      })
      .valueChanges()
      .subscribe(chats => {
        //this.availableusers = users;
        console.log(chats);
        this.chats = chats;
        //console.log(this.content);
      });
  } //ngOnInit

  addChat() {
    if (this.message && this.message !== "") {
      console.log(this.message);
      this.chatPayload = {
        message: this.message,
        sender: this.chatuser.email,
        pair: this.chatService.currentChatPairId,
        time: new Date().getTime()
      };

      this.chatService
        .addChat(this.chatPayload)
        .then(() => {
          //Clear message box
          this.message = "";

          //Scroll to bottom
          this.content.scrollToBottom(300);
        })
        .catch(err => {
          console.log(err);
        });
    }
  } //addChat

  isChatPartner(senderEmail) {
    return senderEmail == this.chatpartner.email;
  } //isChatPartner
}
