import { Button,  View } from "react-native";
import { useKkiapay } from "src/kkiapay";


export default function TestComponent() {

    const {openKkiapayWidget} = useKkiapay();

    const openWidget = () => {
        openKkiapayWidget({amount: 100, key: '3425dc6035d711eca8f5b92f2997955b', sandbox: true })
    }

  return (
    <View>
        <Button title="Pay now" onPress={openWidget}>
    </Vie>
  )
}