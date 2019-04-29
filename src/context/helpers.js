export const updater = (newItem, existingItems) => {
  const newItems = { ...existingItems };
  newItems[newItem.id] = newItem;
  return newItems;
};
