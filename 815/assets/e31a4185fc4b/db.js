const DB_NAME = "shangyin-815-v1";
const DB_VERSION = 1;

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("content")) db.createObjectStore("content");
      if (!db.objectStoreNames.contains("progress")) db.createObjectStore("progress");
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function transact(storeName, mode, action) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const request = action(tx.objectStore(storeName));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}

export const getContent = () => transact("content", "readonly", store => store.get("active"));
export const saveContent = value => transact("content", "readwrite", store => store.put(value, "active"));
export const getProgress = () => transact("progress", "readonly", store => store.get("study"));
export const saveProgress = value => transact("progress", "readwrite", store => store.put(value, "study"));
