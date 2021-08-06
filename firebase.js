  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDo5tctpgAsqs-LN3zZxJ4eBvlGe-m__pU",
    authDomain: "vuejs1-daril.firebaseapp.com",
    projectId: "vuejs1-daril",
    storageBucket: "vuejs1-daril.appspot.com",
    messagingSenderId: "831612121021",
    appId: "1:831612121021:web:89ebe0ff6963f78cf7ecd4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database()
  const kelasRef = db.ref('kelas')