import { Button, StyleSheet } from 'react-native';
import { useKkiapay } from 'src/kkiapay';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestComponent() {
  const { openKkiapayWidget } = useKkiapay();

  const openWidget = () => {
    openKkiapayWidget({
      amount: 100,
      key: 'your_api_key',
      sandbox: true,
      reason: 'Payment',
      verbose: true,
    });
  };

  return (
    <SafeAreaView style={styles.webview}>
      <Button title="Pay now" onPress={openWidget} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
