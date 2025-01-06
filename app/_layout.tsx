import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  return (
    <>
      {/* Stack Navigator */}
      <Stack
        screenOptions={{
          title: "Welcome to Shopping List",
          headerStyle: { backgroundColor: "#007BFF" }, // Mörkblå header
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="shopping-list" options={{ title: "Shopping List" }} />
        <Stack.Screen name="saved-lists" options={{ title: "Saved Lists" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
      </Stack>

      {/* Tre knappar som meny */}
      <View style={styles.menuBar}>
        <Pressable
          onPress={() => handleNavigation("shopping-list")}
          style={({ pressed }) => [

            styles.menuButton,
            pressed && { backgroundColor: "#0056b3" }, // Mörkare blå vid tryck
          ]}
        >
          <Text style={styles.menuText}>Shopping List</Text>
        </Pressable>
        <Pressable
          onPress={() => handleNavigation("saved-lists")}
          style={({ pressed }) => [
            styles.menuButton,
            pressed && { backgroundColor: "#0056b3" }, // Mörkare blå vid tryck
          ]}
        >
          <Text style={styles.menuText}>Saved Lists</Text>
        </Pressable>
        <Pressable
          onPress={() => handleNavigation("settings")}
          style={({ pressed }) => [
            styles.menuButton,
            pressed && { backgroundColor: "#0056b3" }, // Mörkare blå vid tryck
          ]}
        >
          <Text style={styles.menuText}>Settings</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#007BFF", // Mörkblå bakgrund för menyn
    paddingVertical: 10,
  },
  menuButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#4682B4", // Mellanblå för knappar
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
