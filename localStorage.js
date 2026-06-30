const STREAM_ITEMS_KEY = "streamlist_items";

export function loadStreamItems() {
  try {
    const savedItems = localStorage.getItem(STREAM_ITEMS_KEY);

    if (!savedItems) {
      return [];
    }

    return JSON.parse(savedItems);
  } catch (error) {
    console.error("Unable to load StreamList items from localStorage:", error);
    return [];
  }
}

export function saveStreamItems(items) {
  try {
    localStorage.setItem(STREAM_ITEMS_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Unable to save StreamList items to localStorage:", error);
  }
}
