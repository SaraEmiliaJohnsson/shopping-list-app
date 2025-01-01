import { useState } from "react";
import { ShoppingItem } from "../logic/shoppingLogic";
import { View, TextInput, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import shoppingLogic from "../logic/shoppingLogic";

const { addItem, toggleItemPurchased } = shoppingLogic;



const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [itemName, setItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
          style={styles.input}
        />
        <View style={styles.quantityContainer}>
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
        <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

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
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  buttonText: {
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  purchasedItem: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});


export default ShoppingList;