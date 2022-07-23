// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require('firebase/firestore');
const { deleteDoc, collection, addDoc, doc, updateDoc, getDoc, arrayUnion, arrayRemove } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyYb2wgazr8I3DiluF-VSSTbPVMy_INIg",
    authDomain: "push-notification-759a3.firebaseapp.com",
    projectId: "push-notification-759a3",
    storageBucket: "push-notification-759a3.appspot.com",
    messagingSenderId: "224316264147",
    appId: "1:224316264147:web:4a1d43e63cb15b44800e26",
    measurementId: "G-ZVFSNRSJDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const addNotification = async (id, title, body) => {
    const data = doc(getFirestore(), 'users', id);
    const result = false;
    await updateDoc(data, {
        notification: arrayUnion({title, body})
    }).then((res) => {
        console.log('Đã thêm')
        result = true;
    })
        .catch((err) => {
            console.log('Thất bại')
            result = false;
        })
    return result;
}

const addDocument = async (collect, data) => {
    try {
        const docRef = await addDoc(collection(getFirestore(), collect), {
            ...data
        });
        console.log("Added data");
        return 'Added Data'
    } catch (e) {
        console.log("Error adding document: ", e);
    }

}

const getAllNotifications = async(collect, condition) => {
    
}



module.exports = {
    app, addDocument, addNotification
}