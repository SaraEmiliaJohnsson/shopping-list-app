import { Text, View } from "react-native";
import ShoppingList from "./components/ShoppingList";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ShoppingList />
    </View>
  );
}


