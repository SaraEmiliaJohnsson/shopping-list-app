import { useEffect, useState } from "react";
import { ShoppingItem } from "../logic/shoppingLogic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import shoppingLogic from "../logic/shoppingLogic";
import { useSearchParams } from "expo-router/build/hooks";

const { addItem, toggleItemPurchased } = shoppingLogic;



const ShoppingList = () => {
  const searchParams = useSearchParams();
  const searchListName = searchParams.get("listName");
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [itemName, setItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [listName, setListName] = useState<string>(searchListName || '');

  useEffect(() => {
    const loadSavedList = async () => {
      if (searchListName) {
        try {
          const existingLists = JSON.parse((await AsyncStorage.getItem("savedLists")) || "[]");
          const savedList = existingLists.find((list: { name: string }) => list.name === searchListName);

          if (savedList) {
            setItems(savedList.items);
            setListName(savedList.name);
            console.log("Loaded saved list:", savedList);
          }
        } catch (error) {
          console.error("Failed to load saved list:", error);
        }
      }
    };

    loadSavedList();
  }, [searchListName]);


  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('shoppingItems');
        if (storedItems) {
          console.log("Loaded items:", JSON.parse(storedItems));
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Failed to load items from storage:', error);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem('shoppingItems', JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save items to storage:', error);
      }
    };

    if (items.length > 0) {
      saveItems();
    }

  }, [items]);

  const handleAddItem = () => {
    if (itemName.trim()) {
      setItems([addItem([], itemName, quantity)[0], ...items]);
      setItemName('');
      setQuantity(1);
    }
  };

  const handleTogglePurchased = (id: number) => {
    setItems(toggleItemPurchased(items, id));
  };

  const handleSaveList = async () => {
    if (listName.trim()) {
      try {
        const existingLists = JSON.parse((await AsyncStorage.getItem('savedLists')) || '[]');

        const listIndex = existingLists.findIndex((list: { name: string }) => list.name === listName);

        if (listIndex > -1) {
          existingLists[listIndex].items = items;
        } else {
          existingLists.push({ name: listName, items });
        }

        await AsyncStorage.setItem('savedLists', JSON.stringify(existingLists));
        console.log('List saved or updated:', listName);

      } catch (error) {
        console.error('Failed to get saved lists:', error)
      }
    } else {
      console.error('List name is required to save list.')
    }
  }


  const handleNewList = () => {
    setItems([]);
    setListName("");
    console.log("Started a new shopping list.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{listName || "Shopping List"}</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
          style={styles.input}
        />
        <View style={styles.quantityRow}>
          <TouchableOpacity
            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>


      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleTogglePurchased(item.id)}
            style={styles.listItem}
          >
            <Text
              style={[
                styles.itemText,
                item.purchased && styles.purchasedItem,
              ]}
            >
              {item.name} - {item.quantity}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />

      <View>
        <Text style={styles.listNameText}>Enter List name:</Text>
        <TextInput
          placeholder="List Name"
          value={listName}
          onChangeText={setListName}
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleSaveList} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNewList} style={styles.newListButton}>
            <Text style={styles.newButtonText}>New List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E3F2FD",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#90CAF9",
    padding: 7,
    alignSelf: "center",
    width: "90%",
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginRight: 10,
  },
  listNameText: {
    margin: 5,
    fontWeight: "500",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#64B5F6",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#BBDEFB",
  },
  buttonText: {
    fontSize: 18,
    color: "#0D47A1",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
    color: "#0D47A1",
  },
  addButton: {
    backgroundColor: "#1976D2",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 10,
    width: "35%",

  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#BBDEFB",
  },
  itemText: {
    fontSize: 16,
    color: "#0D47A1",
  },
  purchasedItem: {
    textDecorationLine: "line-through",
    color: "#90CAF9",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#64B5F6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "45%",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  newListButton: {
    backgroundColor: "#1976D2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "45%",
  },
  newButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

});



export default ShoppingList;