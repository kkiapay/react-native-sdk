export type TEvent = {
  [key in ListenerEventName]: (data?: any) => void;
};

export type VoidFunction = () => void;
export type VoidCallback = (cb: VoidFunction) => void;

export interface IData {
  amount: number;
  theme?: string;
  countries?: string[];
  paymentMethods?: string[];
  paymentmethod?: string[];
  fullname?: string;
  name?: string;
  email?: string;
  phone?: string;
  sandbox?: boolean;
  position?: string;
  key?: string;
  data?: string;
  api_key?: string;
  publicAPIKey?: string;
  callback?: string;
  url?: string;
  direct?: string;
  split?: string;
  partnerId?: string;
}
export interface ListenerData {
  transactionId: string;
  flwRef?: string;
}
export enum ListenerEventName {
  NETWORK_STATE_CHANGED = 'NETWORK_STATE_CHANGED',
  INIT_WIDGET = 'INIT_WIDGET',
  WIDGET_SUCCESSFULLY_INIT = 'WIDGET_SUCCESSFULLY_INIT',
  CLOSE_WIDGET = 'CLOSE_WIDGET',
  DESTROY_WIDGET = 'DESTROY_WIDGET',
  WIDGET_SUCCESSFULLY_DESTROYED = 'WIDGET_SUCCESSFULLY_DESTROYED',
  PAYMENT_INIT = 'PAYMENT_INIT',
  PAYMENT_ABORTED = 'PAYMENT_ABORTED',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  ON_USER_FEEDBACK = 'ON_USER_FEEDBACK',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_END = 'PAYMENT_END',
  RETRY_PAYMENT = 'RETRY_PAYMENT',
}

export interface ILibrary {
  openKkiapayWidget: (configs: IData) => void;
  closeKkiapayWidget: () => void;
  addSuccessListener: (cb: (data?: any) => void) => void;
  addWidgetInitListener: VoidCallback;
  addKkiapayCloseListener: VoidCallback;
  addWidgetDestroyedListener: VoidCallback;
  addPaymentInitListener: VoidCallback;
  addPaymentAbortedListener: VoidCallback;
  addFeedbackListener: VoidCallback;
  addPendingListener: VoidCallback;
  addFailedListener: (cb: (data?: any) => void) => void;
  addPaymentEndListener: VoidCallback;
  removeKkiapayListener: (event: 'success' | 'failed') => void;

  addKkiapayListener: (
    event: 'success' | 'failed',
    cb: (data?: any) => void
  ) => void;
  onNetworkStateChanged: VoidCallback;
}
