import firebase from 'firebase'; // 4.8.1

var userName = ''
var img = ''
var mymail = ''

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
    return firebase.database().ref('users')
  }
  get refImages(){
    return firebase.storage().ref()
  }
  get userName(){
    return userName
  }
  get profilePicture(){
    return img
  }
  get email(){
    return mymail
  }

  userNameg = async ()=> {
    await firebase.database().ref('/users/').once('value').then(snapshot=>{
      snapshot.forEach(val=>{
        if(firebase.auth().currentUser.uid===val.val()._uid){
          //console.log('myid'+val.val()._uid)
          //console.log('userid'+firebase.auth().currentUser.uid)
          userName = val.val().name
        }
      })
    })
  }


  createNewUser = (email, pass, name, gender,photouri) => {

    firebase.auth().createUserWithEmailAndPassword(email, pass).then(result => {
      const _uid = result.user.uid
      var metadata = { //for image access
        name: _uid
      }
      const UserInf = {
        email,
        pass,
        name,
        gender,
        _uid
      }
      this.refImages.child('images/'+email).put(photouri,metadata)
      this.refUser.push(UserInf)
      firebase.auth().currentUser.sendEmailVerification();
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/email-already-in-use') alert('Email already in use')
      else alert(errorMessage)
    })
  }



  loginUser = async(email, pass, name) => {
    console.log(email)
    var datas = []
    await firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(
      mymail = email
    )
    .catch(error => {
        alert(error)
      })
    return datas
  }

  isVerified = () => {
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

  getImage(){
    var listRef = this.refImages.child('images/')
    listRef.listAll().then(res=>{
      res.items.forEach(val=>{
        if(val.name.toUpperCase() === this.email.toUpperCase()){
          val.getDownloadURL().then(url=>{
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob'
            xhr.onload = ()=>{
              var blob = xhr.response
            };
            xhr.open('GET',url)
            xhr.send()
            img  = url
            console.log(val.name)
          })
        }
      })
    })
  }

  sendResetPassword = async(email) =>{
    var auth = firebase.auth();
    await auth.sendPasswordResetEmail(email).then(function() {
      alert('PLEASE CONTROL TO YOUR MAIL')
    }).catch(function(error) {
      alert(error)
    });
  }



}

Fire.shared = new Fire();
export default Fire;