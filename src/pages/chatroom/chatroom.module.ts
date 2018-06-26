import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatroomPage } from './chatroom';

@NgModule({
  declarations: [
    ChatroomPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatroomPage),
  ],
})
export class ChatroomPageModule {}
