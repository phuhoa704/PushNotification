// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { setDeviceToken } from "../redux/reducers/usersState";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/messaging';
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
const messaging = getMessaging(app);
const auth = getAuth();
const storage = getStorage();

export const getTokenInit = async(setTokenFound, setToken) => {
    return getToken(messaging, { vapidKey: 'BJ-mzCdjee7nkfSHt94ushkYACHgt_JqyTwRsCxm9rwrL7_YfGNrWJzxFF40iGjtvtI1D_-HuY8yFBEaY8a1OE8' })
        .then((currentToken) => {
            if (currentToken) {
                console.log('Current token for client: ', currentToken);
                setTokenFound(true)
                setToken(currentToken);
            }
            else{
                console.log('No registation token available');
                setTokenFound(false)
            }
        })
        .catch((err) => {
            console.log("Error while retreiving token ", err)
        })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
export { auth, messaging, storage }