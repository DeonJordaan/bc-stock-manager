// import * as firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyCS3v8veaohjiXqkhyU2iiRpOpS7PGov3E',
	authDomain: 'stock-manager-fa27c.firebaseapp.com',
	databaseURL:
		'https://stock-manager-fa27c-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'stock-manager-fa27c',
	storageBucket: 'stock-manager-fa27c.appspot.com',
	messagingSenderId: '44159542483',
	appId: '1:44159542483:web:5d1e94622920a0e88fe026',
};

// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// const database = firebase.database();
const database = getDatabase(app);

export default database;
