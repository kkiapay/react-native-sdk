import { Button, View } from 'react-native';
import { useKkiapay } from 'src/kkiapay';
import React from 'react';

export default function TestComponent() {
  const { openKkiapayWidget } = useKkiapay();

  const openWidget = () => {
    openKkiapayWidget({
      amount: 100,
      key: '3425dc6035d711eca8f5b92f2997955b',
      sandbox: true,
      reason: 'Payment',
    });
  };

  return (
    <View>
      <Button title="Pay now" onPress={openWidget} />
    </View>
  );
}
