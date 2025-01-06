import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SavedLists = () => {
  const [savedLists, setSavedLists] = useState<{ name: string; items: any[] }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadSavedLists = async () => {
      try {
        const lists = JSON.parse((await AsyncStorage.getItem("savedLists")) || "[]");
        setSavedLists(lists);
      } catch (error) {
        console.error("Failed to load saved lists:", error);
      }
    };

    loadSavedLists();
  }, []);

  const handleOpenList = (list: { name: string; items: any[] }) => {
    router.push({
      pathname: "/shopping-list",
      params: { listName: list.name, items: JSON.stringify(list.items) },
    });
  };

  const handleDeleteList = async (listName: string) => {
    try {
      const updatedList = savedLists.filter((list) => list.name !== listName);
      setSavedLists(updatedList);
      await AsyncStorage.setItem("savedLists", JSON.stringify(updatedList));
      console.log(`Deleted list: ${listName}`);
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Lists</Text>
      {savedLists.length === 0 ? (
        <Text style={styles.noListText}>No saved lists found.</Text>
      ) : (
        <FlatList
          data={savedLists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <TouchableOpacity
                onPress={() => handleOpenList(item)}
                style={styles.listItem}
              >
                <Text style={styles.listName}>{item.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteList(item.name)}
                style={styles.deleteIcon}
              >
                <Icon name="delete" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
  noListText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  listItem: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#64B5F6",
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#64B5F6",
  },
  deleteIcon: {
    marginLeft: 40,
    padding: 5,
  },
});

export default SavedLists;
