# @kkiapay-org/react-native-sdk

React Native SDK for KKiaPay integration

## Installation

```sh
npm install @kkiapay-org/react-native-sdk
```

## Usage

- Import KKiaPay provider to access all context's features

```js
// In your app file -- App
import { KkiapayProvider } from '@kkiapay-org/react-native-sdk';

import TestComponent from './TestComponent';

export default function App() {
  return (
    <KkiapayProvider>
      <TestComponent />
    </KkiapayProvider>
  );
}
```

- Use the **useKkiapay** hook and get all available functions

```js
// In your component -- TestComponent
import { useKkiapay } from '@kkiapay-org/react-native-sdk';
import { useEffect } from 'react';
import { Button, View } from 'react-native';

export default function TestComponent() {
  const { openKkiapayWidget, addSuccessListener } = useKkiapay();

  useEffect(() => {
    addSuccessListener((data: { transactionId: string }) => {
      console.log('transactionId: ', data.transactionId);
    });
  }, []);

  const openWidget = () => {
    openKkiapayWidget({
      amount: 100,
      key: '3425dc6035d711eca8f5b92f2997955b',
      sandbox: true,
    });
  };

  return (
    <View>
      <Button title="Pay now" onPress={openWidget} />
    </View>
  );
}
```

```ts
// KkiapayProvider's context type
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
