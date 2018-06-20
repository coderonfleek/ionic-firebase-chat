import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { IonicStorageModule, Storage } from "@ionic/storage";

//Third Party Modules
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { appconfig } from "./app.config";
import { ChatService } from "./app.service";
import { ChatsPage } from "../pages/chats/chats";

@NgModule({
  declarations: [MyApp, HomePage, ListPage, ChatsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(appconfig.firebase),
    AngularFirestoreModule,
    IonicStorageModule.forRoot({
      name: "__ionfirechat"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ListPage, ChatsPage],
  providers: [
    StatusBar,
    SplashScreen,
    ChatService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
