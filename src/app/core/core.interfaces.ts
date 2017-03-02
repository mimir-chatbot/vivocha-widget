export type VvcTxRxTypes = 'required' | 'optional' | 'off';
export interface VvcMediaOffer {
    diff: Object;
    offer: VvcOffer;
}
export interface VvcOffer {
    Chat?: VvcMediaOfferDetails;
    Voice?: VvcMediaOfferDetails;
    Video?: VvcMediaOfferDetails;
    Screen?: VvcMediaOfferDetails;
    Sharing?: VvcMediaOfferDetails;
}
export interface VvcMediaOfferDetails {
    tx: VvcTxRxTypes;
    rx: VvcTxRxTypes;
    via?: string;
    engine?: string;
}
export interface VvcWidgetState {
    changeMediaState?: boolean;
    chat: boolean;
    dataCollectionPanel?: boolean;
    error: boolean;
    fullScreen: boolean;
    incomingRequest?: boolean;
    incomingOffer?: VvcOffer;
    lastError: string;
    loading: boolean;
    mobile: boolean;
    mute: boolean;
    sharing: boolean;
    voice: boolean;
    voice_rx?: string;
    voice_tx?: string;
    video: boolean;
    video_rx?: string;
    video_tx?: string;
}
export interface AppState {
    widgetState: VvcWidgetState;
    messages: Array<any>;
}

// DATA COLLECTIONS
export type DcObjectType = 'text' | 'checkbox' | 'date' | 'email' | 'link' | 'phone' | 'nickname' | 'survey' | 'privacy';
export type DcStates = 'hidden' | 'visible';
export interface DataCollectionState {
    state: DcStates;
    dataCollection?: DataCollection;
}
export interface DataCollection {
    key: string;
    type: string;
    inline?: boolean;
    name: string;
    desc: string;
    data: Array<DcObject>;
}
export interface DcObject {
    key: string;
    controlType: string;
    name: string;
    desc: string;
    type: DcObjectType;
    value?: any;
    checked?: boolean;
    policy?: Object;
    visible?: boolean;
    editable?: boolean;
    config?: DcConfigObject;
}
export interface DcConfigObject {
    hide_from_visitor?: boolean;
    multiline?: boolean;
    required?: boolean;
    default_value?: any;
    max?: number;
    min?: number;
    customRegex?: string;
    values?: Array<DcOptValue>;
}
export interface DcOptValue {
    value: any;
    text: string;
    color?: string;
}
