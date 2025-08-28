import { Button, View } from 'react-native';
import { useKkiapay } from 'src/kkiapay';
import React from 'react';

export default function TestComponent() {
  const { openKkiapayWidget } = useKkiapay();

  const openWidget = () => {
    openKkiapayWidget({
      amount: 100,
      key: 'your_api_key',
      sandbox: false,
      reason: 'Payment',
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pay now" onPress={openWidget} />
    </View>
  );
}
