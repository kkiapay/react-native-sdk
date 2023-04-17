import * as React from 'react';

// import { StyleSheet } from 'react-native';
import { KkiapayProvider } from 'src';
import TestComponent from './TestComponent';

export default function App() {
  return (
    <KkiapayProvider>
      <TestComponent />
    </KkiapayProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   box: {
//     width: 60,
//     height: 60,
//     marginVertical: 20,
//   },
// });
