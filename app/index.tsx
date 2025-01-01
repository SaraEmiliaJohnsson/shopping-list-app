import { View, StyleSheet, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Shopping List!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Shopping List"
          onPress={() => router.push("/shopping-list")}
        />
        <Button
          title="Go to Saved Lists"
          onPress={() => router.push("/saved-lists")}
          color="#4CAF50"
        />
        <Button
          title="Go to Settings"
          onPress={() => router.push("/settings")}
          color="#2196F3"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    marginTop: 20,
  },
});
