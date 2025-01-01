export type ShoppingItem = {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
};

const addItem = (
  items: ShoppingItem[],
  name: string,
  quantity: number
): ShoppingItem[] => {
  const newItem: ShoppingItem = {
    id: Date.now(),
    name,
    quantity,
    purchased: false,
  };
  return [...items, newItem];
};

const toggleItemPurchased = (
  items: ShoppingItem[],
  id: number
): ShoppingItem[] => {
  return items.map((item) =>
    item.id === id ? { ...item, purchased: !item.purchased } : item
  );
};


export default { addItem, toggleItemPurchased };
