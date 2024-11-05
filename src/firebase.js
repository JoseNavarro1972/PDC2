import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAco9osz9UmgnZCapaUXkzU6MgpujPpUJk',
  authDomain: 'pruebados-440501.firebaseapp.com',
  projectId: 'pruebados-440501',
  storageBucket: 'pruebados-440501.appspot.com',
  messagingSenderId: '838373861411',
 };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
