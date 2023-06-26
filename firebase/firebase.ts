// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const {
  NEXT_PUBLIC_API_KEY,
  NEXT_PUBLIC_AUTH_DOMAIN,
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_STORAGE_BUCKET,
  NEXT_PUBLIC_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_APP_ID,
  NEXT_PUBLIC_MEASUREMENT_ID,
} = process.env;

// const firebaseConfig = {
//   apiKey: NEXT_PUBLIC_API_KEY,
//   authDomain: NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: NEXT_PUBLIC_APP_ID,
//   measurementId: NEXT_PUBLIC_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyDTyUfwcr6QBK2TwssnJSIMNLBgLSdVHVE',
  authDomain: 'days-of-me.firebaseapp.com',
  projectId: 'days-of-me',
  storageBucket: 'days-of-me.appspot.com',
  messagingSenderId: '1062846148836',
  appId: '1:1062846148836:web:147d5eb513732333483cf1',
  measurementId: 'G-PYM8DR0QQE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
