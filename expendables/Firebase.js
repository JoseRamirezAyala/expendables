import firebase from 'firebase';
 var config = {
    apiKey: "AIzaSyAAqOZ2dmwB9OIU49xwTYpRpqmVQFQCUNw",
    authDomain: "expenses-1308a.firebaseapp.com",
    databaseURL: "https://expenses-1308a.firebaseio.com",
    projectId: "expenses-1308a",
    storageBucket: "expenses-1308a.appspot.com",
    messagingSenderId: "234807118736"
  };
  firebase.initializeApp(config);

  
  function getFirebase()
 {
    return firebase;
 }


 export { getFirebase }