import firebase from 'firebase'; // 4.8.1
import {navigateMainPage} from './src/Components/LoginScreenComponent/LoginScreen'
class Fire {
  constructor() {
    this.init();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDgIWtfo2wdCvwhVLtMh_DWPZblLajYGyI",
        authDomain: "youthmeet-2f58f.firebaseapp.com",
        databaseURL: "https://youthmeet-2f58f.firebaseio.com",
        projectId: "youthmeet-2f58f",
        storageBucket: "youthmeet-2f58f.appspot.com",
        messagingSenderId: "329783812742",
        appId: "1:329783812742:web:3b34c4d348b4ee5dc8e707",
        measurementId: "G-9JH8JQ0Z9P"
      });
    }
    firebase.auth().signOut()
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }
  get refUser() {
    return firebase.database().ref('users');
  }

  createNewUser = (email, pass, name, gender) => {

    firebase.auth().createUserWithEmailAndPassword(email, pass).then(result => {
      const _uid = result.user.uid
      const UserInf = {
        email,
        pass,
        name,
        gender,
        _uid
      }
      this.refUser.push(UserInf)
      firebase.auth().currentUser.sendEmailVerification();
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/email-already-in-use') alert('Email already in use')
      else alert(errorMessage)
    })
  }



  loginUser = (email, pass, name) => {
    var childData
    var childKey
    var datas = []
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .catch(error => {
        console.log('LOGIN USER HATASI')
        alert(error)
      })
    return datas
  }

  isVerified = () => {
    console.log(firebase.auth().currentUser)
    if (firebase.auth().currentUser != undefined) {
      if (firebase.auth().currentUser.emailVerified) return 1
      else return 0
    }
    else return 0
  }



  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }


  append = message => this.ref.push(message);

  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  signOut() {
    firebase.auth().signOut()
  }
  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;