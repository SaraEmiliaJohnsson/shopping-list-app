import { SafeAreaView, StyleSheet, Text } from "react-native";
import ShoppingList from "./components/ShoppingList";

export default function ShoppingListPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Shopping List</Text>
      <ShoppingList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
