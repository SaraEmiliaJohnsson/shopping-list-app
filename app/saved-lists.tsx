import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";


const SavedLists = () => {
  const [savedLists, setSavedLists] = useState<{ name: string; items: any[] }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadSavedLists = async () => {
      try {
        const lists = JSON.parse((await AsyncStorage.getItem('savedLists')) || '[]');
        setSavedLists(lists);
      } catch (error) {
        console.error('Failed to load saved lists:', error);
      }
    };

    loadSavedLists();
  }, []);

  const handleOpenList = (list: { name: string; items: any[] }) => {
    router.push({
      pathname: '/shopping-list',
      params: { listName: list.name, items: JSON.stringify(list.items) },
    });
  };

  // const handleDeleteList = async (listName: string) => {
  //   try {
  //     const
  //   }
  // }

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
            <TouchableOpacity
              onPress={() => handleOpenList(item)}
              style={styles.listItem}
            >
              <Text style={styles.listName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
  listItem: {
    padding: 15,
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
    marginBottom: 10,
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#64B5F6",
  }
});


export default SavedLists;