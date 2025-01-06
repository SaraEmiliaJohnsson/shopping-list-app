import { View, StyleSheet, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Go to Shopping List"
            onPress={() => router.push("/shopping-list")}
            color="#007BFF"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Go to Saved Lists"
            onPress={() => router.push("/saved-lists")}
            color="#4682B4"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Go to Settings"
            onPress={() => router.push("/settings")}
            color="#5F9EA0"
          />
        </View>
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
    color: "#333",
  },
  buttonContainer: {
    width: "80%",
    marginTop: 20,
  },
  buttonWrapper: {
    marginBottom: 10, // Mellanrum mellan knappar
  },
});
