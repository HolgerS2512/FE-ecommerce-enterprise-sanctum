import React, { useEffect, useState } from 'react';
import IndexedDBWrapper from './IndexedDBWrapper';

const dbName = 'MyDatabase';
const dbVersion = 1; // max. 1 to 4.294.967.295
const storeName = 'items';

const Example = () => {
  const [db, setDb] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const dbWrapper = new IndexedDBWrapper(dbName, dbVersion);
    dbWrapper.open().then(() => {
      setDb(dbWrapper);
    }).catch(error => {
      console.error('Failed to open DB:', error);
    });
  }, []);

  const addItem = () => {
    const newItem = { name: 'New Item', value: Math.random() };
    db.addItem(storeName, newItem).then(id => {
      console.log('Item added with id:', id);
      loadItems();
    }).catch(error => {
      console.error('Failed to add item:', error);
    });
  };

  const loadItems = () => {
    const transaction = db.db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      setItems(request.result);
    };

    request.onerror = (event) => {
      console.error('Failed to fetch items:', event.target.error);
    };
  };

  const deleteItem = (id) => {
    db.deleteItem(storeName, id).then(() => {
      console.log('Item deleted');
      loadItems();
    }).catch(error => {
      console.error('Failed to delete item:', error);
    });
  };

  return (
    <div>
      <h1>IndexedDB in React</h1>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.value}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
