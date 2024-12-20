import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyCec-lS8orB_a69a-XKg06pAcc96hzd1wA",
    authDomain: "fokus-c6bb7.firebaseapp.com",
    projectId: "fokus-c6bb7",
    storageBucket: "fokus-c6bb7.firebasestorage.app",
    messagingSenderId: "894349976698",
    appId: "1:894349976698:web:ac14ff54f271fc75eb47c3",
    measurementId: "G-5JR7N1YG6Q"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Obtener referencia a Firestore
export const db = getFirestore(app);
