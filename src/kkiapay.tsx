import { StyleSheet, View, StatusBar } from 'react-native';
import WebView from 'react-native-webview';
import { Buffer } from 'buffer';

import React from 'react';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  DefaultEventListener,
  IData,
  ILibrary,
  ListenerEventName,
  VoidFunction,
} from './typings';

const KkiapayContext = createContext<
  ILibrary & { addEventListener: (cb: DefaultEventListener) => void }
>({
  openKkiapayWidget: () => {},
  closeKkiapayWidget: () => {},
  addSuccessListener: (cb: (data?: any) => void) => {
    console.log(cb);
  },
  addWidgetInitListener: () => {},
  addKkiapayCloseListener: () => {},
  addWidgetDestroyedListener: () => {},
  addPaymentInitListener: () => {},
  addPaymentAbortedListener: () => {},
  addFeedbackListener: () => {},
  addPendingListener: () => {},
  addFailedListener: (cb: (data?: any) => void) => {
    console.log(cb);
  },
  addPaymentEndListener: () => {},
  removeKkiapayListener: (event: 'success' | 'failed') => {
    console.log(event);
  },
  addKkiapayListener: (
    event: 'success' | 'failed',
    cb: (data?: any) => void
  ) => {
    console.log(event, cb);
  },
  onNetworkStateChanged: () => {},
  addEventListener: () => {},
});

export const useKkiapay = () => useContext(KkiapayContext);

const WIDGET_URI = 'https://widget-v3.kkiapay.me?';

export function KkiapayProvider({ children }: PropsWithChildren<any>) {
  const [widgetOpened, isWidgetOpened] = useState(false);
  const [uri, setUri] = useState(WIDGET_URI);
  const [callbacks, setCallbacks] = useState<Record<string, any>>({});
  const defaultEvent = useRef<DefaultEventListener>(() => {});

  function registerCallback<T>(name: ListenerEventName, cb: T) {
    setCallbacks((callbacks) => ({ ...callbacks, [name]: cb }));
  }

  const openKkiapayWidget = (config: IData) => {
    setUri(
      WIDGET_URI +
        Buffer.from(JSON.stringify(config), 'utf-8').toString('base64')
    );
    setTimeout(() => {
      isWidgetOpened(true);
    }, 0);
  };

  const closeKkiapayWidget = () => {
    isWidgetOpened(false);
  };

  const addKkiapayCloseListener = (cb: VoidFunction) => {
    registerCallback(ListenerEventName.CLOSE_WIDGET, cb);
  };

  const onNetworkStateChanged = (cb: VoidFunction) => {
    registerCallback(ListenerEventName.NETWORK_STATE_CHANGED, cb);
  };

  const addSuccessListener = (cb: (data?: any) => void) => {
    registerCallback(ListenerEventName.PAYMENT_SUCCESS, cb);
  };

  const addWidgetInitListener = (cb: VoidFunction) => {
    registerCallback(ListenerEventName.INIT_WIDGET, cb);
  };

  const addWidgetDestroyedListener = (cb: VoidFunction) => {
    registerCallback(ListenerEventName.DESTROY_WIDGET, cb);
  };

  const addPaymentInitListener = (cb: VoidFunction) => {
    registerCallback(ListenerEventName.PAYMENT_INIT, cb);
  };

  const addPaymentAbortedListener = (cb: VoidFunction) => {
    registerCallback(ListenerEventName.PAYMENT_ABORTED, cb);
  };

  const addFeedbackListener = (cb: VoidFunction) => {
    registerCallback(ListenerEventName.ON_USER_FEEDBACK, cb);
  };

  const addPendingListener = (cb: VoidFunction) => {
    registerCallback(ListenerEventName.PENDING_PAYMENT, cb);
  };

  const addFailedListener = (cb: VoidFunction) => {
    registerCallback(ListenerEventName.PAYMENT_FAILED, cb);
  };

  const addPaymentEndListener = (cb: VoidFunction) => {
    registerCallback(ListenerEventName.PAYMENT_END, cb);
  };

  const removeKkiapayListener = (event: 'success' | 'failed') => {
    if (event === 'success')
      registerCallback(ListenerEventName.PAYMENT_SUCCESS, () => {});
    if (event === 'failed')
      registerCallback(ListenerEventName.PAYMENT_FAILED, () => {});
  };

  const addKkiapayListener = (
    event: 'success' | 'failed',
    cb: (data?: any) => void
  ) => {
    if (event === 'success')
      registerCallback(ListenerEventName.PAYMENT_SUCCESS, cb);
    if (event === 'failed')
      registerCallback(ListenerEventName.PAYMENT_FAILED, cb);
  };

  const addEventListener = (cb: DefaultEventListener) => {
    defaultEvent.current = cb;
  };

  const handleMessage = (message: any) => {
    if (message && message.nativeEvent && message.nativeEvent.data) {
      const response = JSON.parse(message.nativeEvent.data);
      const event = response.name as ListenerEventName;
      if (defaultEvent.current)
        defaultEvent.current({ name: event, data: response.data });
      if (event in callbacks) {
        console.log(
          event,
          JSON.stringify(callbacks[event]),
          callbacks,
          response.data
        );
        callbacks[event](response.data);
      }

      if (event === ListenerEventName.CLOSE_WIDGET) closeKkiapayWidget();
    }
  };

  return (
    <KkiapayContext.Provider
      value={{
        openKkiapayWidget,
        closeKkiapayWidget,
        addKkiapayCloseListener,
        onNetworkStateChanged,
        addSuccessListener,
        addWidgetInitListener,
        addWidgetDestroyedListener,
        addPaymentInitListener,
        addPaymentAbortedListener,
        addFeedbackListener,
        addPendingListener,
        addFailedListener,
        addPaymentEndListener,
        addKkiapayListener,
        removeKkiapayListener,
        addEventListener,
      }}
    >
      {widgetOpened && (
        <WebView
          style={{ ...styles.container, marginTop: StatusBar.currentHeight }}
          source={{ uri }}
          onMessage={handleMessage}
        />
      )}
      {!widgetOpened && <View style={styles.container}>{children}</View>}
    </KkiapayContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
