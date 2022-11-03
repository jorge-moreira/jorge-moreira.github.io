import { initializeApp } from 'firebase/app';
import { getDatabase, get as dbGet, ref as dbRef } from 'firebase/database'
import { getStorage, getDownloadURL, ref as storageRef } from 'firebase/storage';

const firebaseConfig = {

    databaseURL: 'https://jorge-moreira-github-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'jorge-moreira-github.appspot.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

async function get<T>(collectionName: string): Promise<T> {
    var cachedColection = localStorage.getItem(collectionName);
    if (cachedColection !== null) {
        return JSON.parse(cachedColection);
    }

    var collectionRef = dbRef(database, collectionName);
    var snapshot = await dbGet(collectionRef);
    var collection = snapshot.val();

    localStorage.setItem(collectionName, JSON.stringify(collection));

    return collection;
}


async function getByProperty<T, U>(collectionName: string, propertyName: string, propertyValue: U): Promise<T> {
    var cachedElement = localStorage.getItem(`${collectionName}_${propertyName}`);
    if (cachedElement !== null) {
        return JSON.parse(cachedElement);
    }

    var collection = await get<T>(collectionName) as any[];
    var element = collection.filter(e => e[propertyName] === propertyValue)[0];
    localStorage.setItem(`${collectionName}_${propertyName}_${propertyValue}`, JSON.stringify(element));

    return element;
}

async function getFileUrl(filePath: string) {

    /*    
    var cachedImage = localStorage.getItem(filePath);
    
    if (cachedImage != null) {
            return cachedImage;
    }
    */

    var fileRef = storageRef(storage, filePath);
    return getDownloadURL(fileRef);
}

export { get, getFileUrl, getByProperty }