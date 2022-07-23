// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyDyYb2wgazr8I3DiluF-VSSTbPVMy_INIg",
  authDomain: "push-notification-759a3.firebaseapp.com",
  projectId: "push-notification-759a3",
  storageBucket: "push-notification-759a3.appspot.com",
  messagingSenderId: "224316264147",
  appId: "1:224316264147:web:4a1d43e63cb15b44800e26",
  measurementId: "G-ZVFSNRSJDN"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});