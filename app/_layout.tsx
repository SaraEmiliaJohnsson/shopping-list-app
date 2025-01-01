import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Stack } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    console.log("Icon Pressed");
    setMenuVisible((prevState) => !prevState);
  };

  const handleNavigation = (route: string) => {
    setMenuVisible(false);
    router.push(route as any);
  };

  return (
    <>
      {/* Stack Navigator */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#4CAF50" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => (
            <Pressable
              onPress={toggleMenu}
              style={[styles.menuIcon, { backgroundColor: "rgba(0,0,255,0.2)" }]} // Temporär visuell markör
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Icon name="ellipsis-vertical" size={24} color="#fff" />
            </Pressable>
          ),
        }}
      >
        <Stack.Screen name="shopping-list" options={{ title: "Shopping List" }} />
        <Stack.Screen name="saved-lists" options={{ title: "Saved Lists" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
      </Stack>

      {/* Dropdown Meny */}
      {menuVisible && (
        <View style={styles.dropdown}>
          <Pressable
            onPress={() => handleNavigation("shopping-list")}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && { backgroundColor: "#e0e0e0" },
            ]}
          >
            <Text style={styles.menuText}>Shopping List</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNavigation("saved-lists")}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && { backgroundColor: "#e0e0e0" },
            ]}
          >
            <Text style={styles.menuText}>Saved Lists</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNavigation("settings")}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && { backgroundColor: "#e0e0e0" },
            ]}
          >
            <Text style={styles.menuText}>Settings</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    marginRight: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    top: 60, // Just under headern
    right: 10, // Ligger i linje med ikonen
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
