import { useState } from "react";
import { addItem, ShoppingItem, toggleItemPurchased } from "../logic/shoppingLogic";
import { View, TextInput, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";



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
      <TextInput
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
        style={styles.input}
      />
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Button title="Add Item" onPress={handleAddItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTogglePurchased(item.id)}>
            <Text
              style={{
                textDecorationLine: item.purchased ? 'line-through' : 'none',
              }}
            >
              {item.name} - {item.quantity}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
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
  },
  buttonText: {
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default ShoppingList;