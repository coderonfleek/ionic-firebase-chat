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
//import { GravatarModule } from "ng2-gravatar-directive";
import { appconfig } from "./app.config";
import { ChatService } from "./app.service";
import { ChatsPage } from "../pages/chats/chats";
import { ChatroomPage } from "../pages/chatroom/chatroom";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  declarations: [MyApp, HomePage, ListPage, ChatsPage, ChatroomPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(appconfig.firebase),
    AngularFirestoreModule,
    //GravatarModule,
    PipesModule,
    IonicStorageModule.forRoot({
      name: "__ionfirechat"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ListPage, ChatsPage, ChatroomPage],
  providers: [
    StatusBar,
    SplashScreen,
    ChatService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
