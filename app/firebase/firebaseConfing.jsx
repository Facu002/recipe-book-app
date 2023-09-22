import { initializeApp } from 'firebase/app';
import {collection,getDocs, getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB5zBuHAtdREE4y_5OULJ8OB3agC_6kaGY",
    authDomain: "recipe-book-133d7.firebaseapp.com",
    projectId: "recipe-book-133d7",
    storageBucket: "recipe-book-133d7.appspot.com",
    messagingSenderId: "586320063235",
    appId: "1:586320063235:web:6e808c567941a2928cd736"
};

const app = initializeApp(firebaseConfig);

export { app };
