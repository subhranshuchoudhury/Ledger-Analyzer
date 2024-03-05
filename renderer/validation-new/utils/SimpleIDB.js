import { openDB } from 'idb';

export class SimpleIDB {
    constructor(dbName, storeName) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.db = null;
    }

    async openDatabase() {
        this.db = await openDB(this.dbName, 1, {
            upgrade: (db) => {
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
                }
            },
        });
    }

    getObjectStore(transactionType) {
        const transaction = this.db.transaction(this.storeName, transactionType);
        return transaction.objectStore(this.storeName);
    }

    async set(key, value) {
        try {
            await this.openDatabase();
            const store = this.getObjectStore('readwrite');
            await store.add({ id: key, data: value });
            return `Data with key ${key} added successfully.`;
        } catch (error) {
            throw `Error adding data: ${error}`;
        }
    }

    async get(key) {
        try {
            await this.openDatabase();
            const store = this.getObjectStore('readonly');
            const result = await store.get(key);
            return result ? result.data : null;
        } catch (error) {
            throw `Error getting data: ${error}`;
        }
    }

    async remove(key) {
        try {
            await this.openDatabase();
            const store = this.getObjectStore('readwrite');
            await store.delete(key);
            return `Data with key ${key} removed successfully.`;
        } catch (error) {
            throw `Error removing data: ${error}`;
        }
    }
}
