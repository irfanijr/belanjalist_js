
const shoppingForm = document.getElementById('shopping-form');
const itemInput = document.getElementById('item-input');
const shoppingList = document.getElementById('shopping-list');
const emptyMessage = document.getElementById('empty-message');
const clearAllBtn = document.getElementById('clear-all-btn');

const STORAGE_KEY = 'shopping_list_items';

document.addEventListener('DOMContentLoaded', loadItemsFromStorage);

shoppingForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const itemText = itemInput.value.trim();
  if (itemText === '') return;

  const newItem = {
    id: Date.now().toString(),
    text: itemText
  };

  renderItem(newItem);
  saveItemToStorage(newItem);

  itemInput.value = '';
  itemInput.focus();
  updateUIState();
});

clearAllBtn.addEventListener('click', function () {
  if (confirm('Apakah Anda yakin ingin menghapus semua item dari daftar?')) {
    shoppingList.innerHTML = '';
    localStorage.removeItem(STORAGE_KEY);
    updateUIState();
  }
});

function renderItem(item) {
  const li = document.createElement('li');
  li.dataset.id = item.id;

  const spanText = document.createElement('span');
  spanText.textContent = item.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'X';
  deleteBtn.title = 'Hapus item';

  deleteBtn.addEventListener('click', function () {
    li.remove();
    removeItemFromStorage(item.id);
    updateUIState();
  });

  li.appendChild(spanText);
  li.appendChild(deleteBtn);
  shoppingList.appendChild(li);
}

function getItemsFromStorage() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
}

function saveItemToStorage(item) {
  const items = getItemsFromStorage();
  items.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function removeItemFromStorage(id) {
  let items = getItemsFromStorage();
  items = items.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function loadItemsFromStorage() {
  const items = getItemsFromStorage();
  items.forEach(item => renderItem(item));
  updateUIState();
}

function updateUIState() {
  const hasItems = shoppingList.children.length > 0;
  emptyMessage.style.display = hasItems ? 'none' : 'block';
  clearAllBtn.style.display = hasItems ? 'block' : 'none';
}
