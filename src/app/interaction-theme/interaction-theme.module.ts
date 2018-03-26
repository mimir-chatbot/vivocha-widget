import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TopBarModule} from '../modules/top-bar/top-bar.module';
import {ChatModule} from '../modules/chat/chat.module';
import {ChatPanelsModule} from '../modules/chat-panels/chat-panels.module';
import {MessagesModule} from '../modules/messages/messages.module';
import {ClosePanelModule} from '../modules/close-panel/close-panel.module';
import {LoadingPanelModule} from '../modules/loading-panel/loading-panel.module';
import {MinimizedModule} from '../modules/minimized/minimized.module';
import {DataCollectionModule} from '../modules/data-collection/data-collection.module';

const layoutModules = [
  TopBarModule,
  DataCollectionModule,
  ChatModule,
  ChatPanelsModule,
  MessagesModule,
  ClosePanelModule,
  LoadingPanelModule,
  MinimizedModule
];

@NgModule({
  imports: [
    CommonModule,
    ...layoutModules
  ],
  exports: [
    ...layoutModules
  ],
  declarations: [

  ]
})
export class InteractionThemeModule { }
