import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import { WidgetState } from '../store/models.interface';
import {AppState, getWidgetState} from '../store/reducers/main.reducer';
import {LoadContextSuccess} from '../store/actions/context.actions';
import {
  WidgetClosedByAgent,
  WidgetClosedByVisitor,
  WidgetInitContext,
  WidgetInitProtocol,
  WidgetSetAgent,
  WidgetInitChat,
  WidgetInitializeMultimedia,
  WidgetShowClosePanel,
  WidgetToggleEmoji,
  WidgetShowUploadPanel,
  WidgetIsWriting,
  WidgetSetMinimized,
  WidgetSetNormal,
  WidgetMarkAsRead,
  WidgetNewMessage,
  WidgetIsUploading,
  WidgetUploadCompleted,
  WidgetSetTopBar,
  WidgetMediaChange,
  WidgetMediaOffer,
  WidgetIncomingMedia,
  WidgetOfferRejected,
  WidgetMuteSuccess,
  WidgetMuteInProgress,
  WidgetSetMinimizedMedia,
  WidgetIsOffering,
  WidgetOfferAccepted,
  WidgetSetFullScreen,
  WidgetShowChatOnFullScreen,
  WidgetSetVideoTransit
} from '../store/actions/widget.actions';
import {DataCollectionSelected, DataCollectionCompleted, DataCollectionLoaded} from '../store/actions/dataCollection.actions';

@Injectable()
export class VvcUiService {

  currentState: WidgetState;
  constructor(private store: Store<AppState>){
    this.store.select(getWidgetState).subscribe( state => {
      this.currentState = state
    });
  }
  hideChat(){
    this.store.dispatch(new WidgetSetMinimizedMedia(false));
  }
  initializeChat(media){
    console.log('initializing chat', media);
    this.store.dispatch(new WidgetInitChat(media));
  }
  initializeContext(context){
    this.store.dispatch(new LoadContextSuccess(context));
    this.store.dispatch(new WidgetInitContext(context));

  }
  initializeMedia(media){
    this.initializeChat(media);
    this.initializeMultimedia(media);
    this.setMediaState(media);
  }
  initializeMultimedia(media){
    console.log('initializeMultimedia', media);
    this.store.dispatch(new WidgetInitializeMultimedia(media));
  }
  initializeProtocol(context, conf){
    this.store.dispatch(new WidgetInitProtocol({
      requestedMedia: context.requestedMedia,
      canStartAudio: context.media.voice === 'both' || context.media.voice === 'visitor',
      canStartVideo: context.media.video === 'both' || context.media.video === 'visitor',
      initialOffer: conf.initialOffer
    }));
  }
  loadDataCollections(dcList){
    this.store.dispatch(new DataCollectionLoaded(dcList));
  }
  newMessageReceived(){
    this.store.dispatch(new WidgetNewMessage());
  }
  resetTopBar(){
    this.store.dispatch(new WidgetSetTopBar({title: '', subtitle: '', avatar: ''}));
  }
  selectDataCollection(dc){
    this.store.dispatch(new DataCollectionSelected(dc));
  }
  setOfferAccepted(){
    this.store.dispatch(new WidgetOfferAccepted());
  }
  setAgent(agent){
    console.log('setting agent');
    this.store.dispatch(new WidgetSetAgent(agent));
    this.store.dispatch(new WidgetSetTopBar({title: agent.nick, subtitle: 'STRINGS.QUEUE.TOPBAR.CONNECTED', avatar: agent.avatar}));
  }
  setClosedByAgent(){
    this.store.dispatch(new WidgetClosedByAgent());
  }
  setClosedByVisitor(){
    this.store.dispatch(new WidgetClosedByVisitor());
  }
  setCloseModal(show: boolean){
    this.store.dispatch(new WidgetShowClosePanel(show));
  }
  setDataCollectionCompleted(opt){
    this.store.dispatch(new DataCollectionCompleted(opt))
  }
  setDataCollectionPanel(show: boolean, topBarTitle: string){
    /*
    this.extendAndDispatch(this.currentState, {
      isLoading: false,
      isInQueue: false,
      isChatVisible: false,
      isMediaVisible: false,
      showDataCollectionPanel: show,
      topbar_subtitle: topBarTitle,
      lastAction: show ? 'showDataCollectionPanel' : 'hideDataCollectionPanel'
    });
    */
  }
  setFullScreenChat(show){
    this.store.dispatch(new WidgetShowChatOnFullScreen(show));
    this.store.dispatch(new WidgetMarkAsRead());
  }
  setFullScreen(){
    this.store.dispatch(new WidgetSetFullScreen());
  }
  setHangUpState(){
    this.store.dispatch(new WidgetSetNormal());
  }
  setNormalScreen(){
    this.store.dispatch(new WidgetSetNormal());
    this.store.dispatch(new WidgetShowChatOnFullScreen(false));
  }
  setIncomingMedia(media){
    this.store.dispatch(new WidgetIncomingMedia(media));
  }
  setInTransit(transit){
    this.store.dispatch(new WidgetSetVideoTransit(transit));
  }
  setIsOffering(media){
    this.store.dispatch(new WidgetIsOffering(media));
  }
  setIsWriting(isWriting: boolean){
    this.store.dispatch(new WidgetIsWriting(isWriting));
  }
  setMediaOffer(offer){
    this.store.dispatch(new WidgetMediaOffer(offer));
  }
  setMediaState(media) {
    console.log('setting media state', media);
    this.store.dispatch(new WidgetMediaChange(media));
  }
  setMinimizedState(){
    this.store.dispatch(new WidgetSetMinimized());
  }
  setMinimizedMedia(){
    this.store.dispatch(new WidgetSetMinimizedMedia(true));
    this.store.dispatch(new WidgetMarkAsRead());
  }
  setMuted(muted){
    this.store.dispatch(new WidgetMuteSuccess(muted));
  }
  setMuteInProgress(){
    this.store.dispatch(new WidgetMuteInProgress());
  }
  setNormalState(){
    this.store.dispatch(new WidgetSetNormal());
    this.store.dispatch(new WidgetMarkAsRead());
  }
  setOfferRejected(){
    this.store.dispatch(new WidgetOfferRejected());
  }
  setTopBarWithAgentInfo(agent){
    this.store.dispatch(new WidgetSetTopBar({title: agent.nick, subtitle: 'STRINGS.QUEUE.TOPBAR.CONNECTED', avatar: agent.avatar}));
  }
  setSurveyCompleted(){
    /*
    this.extendAndDispatch(this.currentState, {
      surveyCompleted : true
    })
    */
  }
  setSurveyPanel(){

    /*
    this.extendAndDispatch(this.currentState, {
      showSurveyPanel: true,
      isSendAreaVisible: false,
      isChatVisible: false,
      isMediaVisible: false,

      topbar_title: 'STRINGS.SURVEY.TITLE',
      topbar_subtitle: 'STRINGS.SURVEY.SUBTITLE'
    })
    */
  }
  setUploadPanel(show: boolean){
    this.store.dispatch(new WidgetShowUploadPanel(show));
  }
  setUploading(){
    this.store.dispatch(new WidgetIsUploading());
  }
  setUploaded(){
    this.store.dispatch(new WidgetUploadCompleted())
  }
  toggleEmojiPanel(){
    this.store.dispatch(new WidgetToggleEmoji());
  }
}