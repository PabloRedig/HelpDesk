// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAcW6RpkBXBeWU5VKmmQ4qPkqbW5U8D2fQ",
    authDomain: "helpdesk-11fec.firebaseapp.com",
    projectId: "helpdesk-11fec",
    storageBucket: "helpdesk-11fec.appspot.com",
    messagingSenderId: "368503389405",
    appId: "1:368503389405:web:f54412997f37a1efe1af34"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
