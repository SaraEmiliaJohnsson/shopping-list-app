import { useEffect, useState } from "react";
import { ShoppingItem } from "../logic/shoppingLogic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import shoppingLogic from "../logic/shoppingLogic";

const { addItem, toggleItemPurchased } = shoppingLogic;



const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [itemName, setItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [listName, setListName] = useState<string>('');

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
      setItems(addItem(items, itemName, quantity));
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
        const newList = { name: listName, items };
        await AsyncStorage.setItem('savedList', JSON.stringify([...existingLists, newList]));
        setListName('');

      } catch (error) {
        console.error('Failed to get saved lists:', error)
      }
    }
  }

  return (
    <View style={styles.container}>
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
        <TextInput
          placeholder="List Name"
          value={listName}
          onChangeText={setListName}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSaveList} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E3F2FD", // Ljusblå bakgrund
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
    borderColor: "#90CAF9", // Ljusblå kant
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#FFFFFF", // Vit bakgrund
    marginRight: 10, // Mellanrum till kvantitetskontroller
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#64B5F6", // Mellanblå kant
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#BBDEFB", // Ljusblå bakgrund
  },
  buttonText: {
    fontSize: 18,
    color: "#0D47A1", // Mörkblå text
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
    color: "#0D47A1", // Mörkblå text
  },
  addButton: {
    backgroundColor: "#1976D2", // Mellanblå knapp
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10, // Litet mellanrum till raden ovan
  },
  addButtonText: {
    color: "#FFFFFF", // Vit text
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#BBDEFB", // Ljusblå linje
  },
  itemText: {
    fontSize: 16,
    color: "#0D47A1", // Mörkblå text
  },
  purchasedItem: {
    textDecorationLine: "line-through",
    color: "#90CAF9", // Ljusblå genomstruken text
  },
  saveButton: {
    backgroundColor: "#64B5F6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

});



export default ShoppingList;